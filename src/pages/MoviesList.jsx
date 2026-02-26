
import { useEffect, useState } from "react";
import Card from "../components/Card"
import useFetch from "../hooks/useFetch";
import VPNBanner from "../components/VPNBanner";
import useVPN from "../hooks/useVPN";



const MoviesList = ({ api, title }) => {
  const { isVPN, resetDetection, provider, forceUnlock } = useVPN();
  const { data: movies } = useFetch(api)

  useEffect(() => {
    document.title = `${title} / cinebite`
  });


  return (

    <main>
      <VPNBanner />

      {isVPN ? (
        <section className="max-w-7xl mx-auto py-7">
          <h1 className="text-3xl font-bold px-5 mb-8 text-gray-900 dark:text-white border-l-4 border-blue-600 pl-4 uppercase tracking-wider">
            {title}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      ) : (
        <section className="max-w-7xl mx-auto py-24 px-5">
          <div className="relative overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-[2.5rem] p-12 text-center shadow-2xl">
            {/* Animated Background Gradients */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>

            <div className="relative z-10">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-3xl mx-auto mb-8 border border-gray-200 dark:border-gray-700 shadow-inner">
                <svg className="w-10 h-10 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>

              <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">Database Locked</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed font-medium">
                Our cinematic database is currently encrypted. Please establish a <span className="text-blue-600 dark:text-blue-400 font-bold">VPN connection</span> to authenticate your access and unlock standard browsing.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 rounded-2xl text-sm font-semibold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700 max-w-xs mx-auto truncate">
                  Status: <span className="text-red-500 dark:text-red-400">Unsecured</span>
                  <span className="block text-[10px] text-gray-400 mt-1 uppercase tracking-tighter">Detected: {provider || "Checking..."}</span>
                </div>
                <button
                  onClick={resetDetection}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95"
                >
                  Clear Cache & Re-Verify
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-widest">Emergency Bypass</p>
                <button
                  onClick={forceUnlock}
                  className="px-6 py-2 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500 dark:hover:border-blue-500 text-xs font-bold rounded-xl transition-all active:scale-95"
                >
                  VPN Active but still locked? Click to Force Access
                </button>
                <p className="mt-3 text-[10px] text-gray-300 dark:text-gray-600 italic">
                  *Use only if you are manually certain your VPN is active.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}

export default MoviesList