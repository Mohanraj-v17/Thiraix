import { useState, useEffect, use } from "react"
import useFetch from "../hooks/useFetch";
import { Link, useParams } from "react-router-dom"
import { options } from '../utils/Options.jsx'
import BackUp from "../assets/backup.jpg"
import { FaDownload } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";
import useVPN from "../hooks/useVPN";
import VPNBanner from "../components/VPNBanner";


const MoviesDetails = () => {
  const { isVPN, resetDetection, provider, forceUnlock } = useVPN();

  useEffect(() => {
    document.title = `${original_title} / cinebite`
  })

  const { id } = useParams();
  const [data, setData] = useState({});

  const {
    original_title,
    overview,
    poster_path,
    backdrop_path,
    genres,
    runtime,
    production_companies,
    release_date,
    spoken_languages,
    vote_count,
    vote_average,
    popularity
  } = data;

  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : BackUp;

  const photo = backdrop_path
    ? `https://image.tmdb.org/t/p/w500/${backdrop_path}`
    : BackUp;

  useEffect(() => {
    async function fetchMovie() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      const json = await response.json();
      setData(json);
    }
    fetchMovie();
  }, [id]);

  return (
    <div
      className="relative w-screen min-h-screen bg-cover bg-center "
      style={{ backgroundImage: isVPN ? `url(${photo})` : 'none' }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-20 pt-4">
        <VPNBanner />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        {isVPN ? (
          <div className="max-w-5xl w-full flex flex-col md:flex-row bg-black/50 rounded-xl shadow-2xl overflow-hidden">


            <img
              src={image}
              alt={original_title}
              className="w-full md:w-64 h-81 object-cover"
            />


            <div className="p-6 text-white text-center md:text-left">

              <div className="flex flex-wrap justify-between items-center mb-4">
                <h5 className="text-3xl font-bold">
                  {original_title} ({release_date?.split("-")[0]})
                </h5>
                <span className="relative">
                  <FaDownload className=" text-white text-2xl cursor-pointer" />
                </span>
              </div>



              <div className="text-gray-400 font-bold mb-4 flex gap-2 justify-center md:justify-start">
                <span ><p>{runtime} minutes / </p></span>
                <span><p>{spoken_languages?.map((language) => language.name).join(", ")}</p></span>
              </div>



              <p className="text-gray-200 leading-relaxed mb-6">
                {overview}
              </p>

              <div className="my-6 flex flex-wrap gap-2 justify-center md:justify-start">
                {production_companies?.map((company) => (
                  <span
                    key={company.id}
                    className="bg-white/10 px-3 py-1 rounded-full text-sm font-bold"
                  >
                    {company.name}
                  </span>
                ))}
              </div>

              <div className="my-7 flex flex-wrap gap-3 justify-center md:justify-start">
                {genres?.map((genre) => (
                  <span
                    key={genre.id}
                    className="border border-gray-600 rounded px-3 py-1 text-sm bg-black/30"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <div className="text-gray-300 text-sm flex flex-wrap gap-5 justify-center md:justify-start mb-6">
                <p>Vote-Count: {vote_count}</p>
                <p>Vote-Average: {vote_average}</p>
                <p>Popularity: {popularity}</p>

              </div>

              <div className="flex justify-center md:justify-end">
                <Link to="/">
                  <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 font-medium rounded-full text-sm px-8 py-2.5 transition-colors">Go back</button>
                </Link>
              </div>

            </div>
          </div>
        ) : (
          <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl p-10 text-center border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4 tracking-tight">Details Locked</h2>
            <p className="text-gray-300 mb-8 font-medium">
              Movie details and streaming links are restricted to VPN users only.
            </p>
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="px-5 py-2 bg-black/30 rounded-xl text-xs font-bold text-gray-300 border border-white/10">
                PROVIDER: {provider || "Checking..."}
              </div>
              <button
                onClick={resetDetection}
                className="px-6 py-2 bg-white text-black text-sm font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
              >
                Clear Cache & Re-Verify
              </button>
            </div>

            <button
              onClick={forceUnlock}
              className="mb-8 text-[10px] text-white/40 hover:text-white underline decoration-dotted"
            >
              VPN active but still locked? Force Unlock
            </button>
            <Link to="/">
              <button className="text-white/60 hover:text-white text-sm font-bold transition-colors">
                Return to Home
              </button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
};

export default MoviesDetails;
