import { useSearchParams, Link } from "react-router-dom";
import Card from "../components/Card"
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";
import VPNBanner from "../components/VPNBanner";
import useVPN from "../hooks/useVPN";


const Search = ({ api }) => {
  const { isVPN, resetDetection, provider, forceUnlock } = useVPN();
  const [searchParams] = useSearchParams();

  const queryTerm = searchParams.get("q");

  const { data: movies } = useFetch(api, queryTerm);


  useEffect(() => {
    document.title = `${queryTerm} / cinebite`
  })


  return (
    <main>
      <VPNBanner />

      {isVPN ? (
        <>
          <section>
            <p className="text-3xl text-gray-900 dark:text-white">
              {movies.length === 0 ? `no result for ( ${queryTerm} )` : `results for ( ${queryTerm} )`}
            </p>
          </section>

          <Link to="/" className="absolute top-20 right-3">
            <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Go back</button>
          </Link>

          <section className="max-w-7xl mx-auto py-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
              {movies.map((movie) => (
                <Card key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        </>
      ) : (
        <section className="max-w-7xl mx-auto py-20 text-center">
          <div className="bg-white/5 dark:bg-gray-800/50 rounded-[2rem] p-10 border border-gray-200 dark:border-gray-700 backdrop-blur-sm mx-5">
            <h2 className="text-2xl font-bold text-gray-400 dark:text-gray-500 mb-4 tracking-tight">Search Locked</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8 font-medium">
              Please connect to a VPN to use the search functionality and view movie results.
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="px-5 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-xs font-bold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700">
                PROVIDER: {provider || "Checking..."}
              </div>
              <button
                onClick={resetDetection}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl transition-all shadow-lg active:scale-95"
              >
                Clear Cache & Re-Verify
              </button>
            </div>

            <button
              onClick={forceUnlock}
              className="mt-6 text-[10px] text-gray-500 hover:text-blue-500 underline decoration-dotted"
            >
              VPN active but still locked? Force Unlock
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

export default Search