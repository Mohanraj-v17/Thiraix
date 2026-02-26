import { useVPNContext } from '../context/VPNContext.jsx';

/**
 * Custom hook to detect if the user is likely using a VPN or Proxy.
 * Now acts as a bridge to the global VPNContext to ensure 
 * consistent state and prevent API rate limiting.
 */
const useVPN = () => {
    return useVPNContext();
};

export default useVPN;
