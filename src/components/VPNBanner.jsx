import { HiOutlineShieldCheck, HiOutlineInformationCircle } from "react-icons/hi";
import useVPN from "../hooks/useVPN";

const VPNBanner = () => {
  const { isVPN, loading } = useVPN();

  if (loading || isVPN) return null;
  return (
    <div className="max-w-7xl mx-auto px-5 mb-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-xl p-6 sm:p-8">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-amber-500/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>

        <div className="relative flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-amber-500/30 text-amber-700 dark:text-amber-400 border border-amber-500/40">
              <HiOutlineShieldCheck className="w-10 h-10" />
            </div>
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-50 flex items-center justify-center sm:justify-start gap-2">
              <HiOutlineInformationCircle className="w-5 h-5" />
              VPN Connection Required
            </h3>
            <p className="mt-2 text-amber-900/90 dark:text-amber-100/90 leading-relaxed font-semibold">
              To ensure uninterrupted access to our movie database and streaming services, please make sure your <span className="text-amber-700 dark:text-amber-300 font-extrabold underline decoration-amber-500/50 underline-offset-4">VPN is active</span> before browsing.
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-xl bg-amber-600 dark:bg-amber-500 text-white text-sm font-bold shadow-lg shadow-amber-500/30">
              Network Secured
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VPNBanner;
