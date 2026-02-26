import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const VPNContext = createContext();

export const VPNProvider = ({ children }) => {
    const [isVPN, setIsVPN] = useState(() => {
        const detected = localStorage.getItem('vpn_detected') === 'true';
        const forced = localStorage.getItem('vpn_force_unlocked') === 'true';
        return detected || forced;
    });
    const [loading, setLoading] = useState(true);
    const [provider, setProvider] = useState(() => {
        return localStorage.getItem('vpn_provider_name') || "";
    });
    const [reason, setReason] = useState("");

    const detectVPN = useCallback(async (manual = false) => {
        if (manual) setLoading(true);

        try {
            const cacheBuster = `?nocache=${Date.now()}`;
            const providers = [
                `https://json.geoiplookup.io/${cacheBuster}`,
                `https://api.db-ip.com/v2/free/self${cacheBuster}`,
                `https://ipwhois.app/json/${cacheBuster}`,
                `https://freeipapi.com/api/json${cacheBuster}`
            ];

            let data = null;
            let fetchError = null;

            for (const url of providers) {
                try {
                    const controller = new AbortController();
                    const id = setTimeout(() => controller.abort(), 3000);

                    const response = await fetch(url, { signal: controller.signal });
                    clearTimeout(id);

                    if (response.ok) {
                        const json = await response.json();
                        // geoiplookup.io normalization
                        data = {
                            org: json.org || json.connection?.org || json.organization || json.isp || "",
                            isp: json.isp || json.connection?.isp || json.org || "",
                            timezone: json.timezone || json.timezone_name || json.timeZone || json.timeZoneId || ""
                        };

                        // Log success but verify if we actually got data
                        if (data.org || data.isp || data.timezone) {
                            console.log(`%c Detection Success [${manual ? 'MANUAL' : 'AUTO'}]: ${url} `, "background: #059669; color: #fff;");
                            break;
                        } else {
                            data = null;
                        }
                    }
                } catch (e) {
                    fetchError = e;
                }
            }

            if (!data) throw fetchError || new Error("Connection Signal Lost");

            const org = data.org.toLowerCase();
            const ispName = data.isp.toLowerCase();
            const ipTimezone = data.timezone;

            // ROBUST TIMEZONE CHECK: Compare current UTC offsets
            // This is more reliable than string matching (Kolkata vs Calcutta)
            let timezoneMismatch = false;
            try {
                const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                const now = new Date();
                const browserOffset = now.toLocaleString("en-US", { timeZone: browserTimezone, timeZoneName: "short" }).split("GMT")[1] || "";
                const ipOffset = ipTimezone ? now.toLocaleString("en-US", { timeZone: ipTimezone, timeZoneName: "short" }).split("GMT")[1] || "" : browserOffset;

                timezoneMismatch = ipOffset !== browserOffset;
                console.log(`%c Timezone Check: Browser(${browserOffset}) vs IP(${ipOffset}) `, "color: #a855f7;");
            } catch (e) {
                console.warn("Timezone check failed, falling back to basic match:", e.message);
            }

            // Improved Regex: More specific to avoid false positives with residential carriers
            const isDataCenter = /hosting|google|amazon|cloudflare|digitalocean|virmach|vpn|proxy|m247|packet|ovh|leaseweb|choopa|kamatera|linode|hetzner|vultr|vultr|teliasonera|apple/i.test(org);
            const isVPNISP = /vpn|proxy|relay|tunnel|expressvpn|nordvpn|surfshark/i.test(ispName);

            const detected = timezoneMismatch || isDataCenter || isVPNISP;

            // Build a reason string for better debugging
            const reasons = [];
            if (timezoneMismatch) reasons.push("TIMEZONE_MISMATCH");
            if (isDataCenter) reasons.push("DATACENTER_OR_ORG_MISMATCH");
            if (isVPNISP) reasons.push("ISP_VPN_KEYWORD");
            const detectionReason = reasons.length > 0 ? reasons.join(" + ") : "Residential/Direct Connection";

            console.log("%c VPN ANALYSIS COMPLETE ", "background: #2563eb; color: #fff; font-weight: bold; padding: 4px; border-radius: 4px;");
            console.log("Verdict:", detected ? "SECURED (RESTRICTED)" : "UNSECURED (ALLOWED)");
            console.log("Reason:", detectionReason);
            console.log("System Analysis:", {
                timezoneMismatch,
                isDataCenter,
                isVPNISP,
                network: { org, isp: ispName, ipTimezone }
            });

            setIsVPN(detected);
            setProvider(data.isp || data.org || "Verified Network");
            setReason(detectionReason);

            // Update storage with REAL detection result
            localStorage.setItem('vpn_detected', detected);
            localStorage.setItem('vpn_provider_name', data.isp || data.org || "Verified Network");
            localStorage.setItem('vpn_last_check', Date.now().toString());

            // CLEAR FORCED STATUS: If we found no VPN, we must reset any forced bypass
            if (!detected) {
                localStorage.removeItem('vpn_force_unlocked');
            }

        } catch (error) {
            console.error("VPN Detection Fault:", error);

            const wasForced = localStorage.getItem('vpn_force_unlocked') === 'true';
            if (wasForced) {
                setIsVPN(true);
                setProvider("Session Restored (Manual Bypass)");
            } else {
                setIsVPN(false);
                localStorage.setItem('vpn_detected', 'false');
                setProvider("Network Connection Error");
                setReason(error.message);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        detectVPN();
    }, [detectVPN]);

    const resetDetection = () => {
        localStorage.removeItem('vpn_detected');
        localStorage.removeItem('vpn_force_unlocked');
        localStorage.removeItem('vpn_last_check');
        localStorage.removeItem('vpn_provider_name');
        setReason("");
        window.location.reload();
    };

    const forceUnlock = () => {
        localStorage.setItem('vpn_force_unlocked', 'true');
        localStorage.setItem('vpn_detected', 'true');
        localStorage.setItem('vpn_last_check', (Date.now() + 100000000).toString());
        setIsVPN(true);
        window.location.reload();
    };

    return (
        <VPNContext.Provider value={{ isVPN, loading, provider, reason, resetDetection, forceUnlock, reVerify: () => detectVPN(true) }}>
            {children}
        </VPNContext.Provider>
    );
};

export const useVPNContext = () => {
    const context = useContext(VPNContext);
    if (!context) {
        throw new Error("useVPNContext must be used within a VPNProvider");
    }
    return context;
};
