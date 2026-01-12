import { useState,useEffect,useFetch, use } from "react"
import { Link, useParams } from "react-router-dom"
import {options} from '../utils/Options.jsx'
import BackUp from "../assets/backup.jpg"
import { FaDownload } from "react-icons/fa";
import { VscBookmark } from "react-icons/vsc";


const MoviesDetails = () => {

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
      style={{ backgroundImage: `url(${photo})` }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
         
        <div className="max-w-5xl w-full flex flex-col md:flex-row bg-black/50 rounded-xl shadow-2xl overflow-hidden">
      

          <img
            src={image}
            alt={original_title}
            className="w-full md:w-64 h-81 object-cover"
          />
          

          <div className="p-6 text-white">
           
            <div className="flex flex-wrap justify-between">
              <h5 className="text-3xl font-bold text-center md:text-left lg:text-left">
              {original_title} ({release_date?.split("-")[0]})   
            </h5>
             <span className="relative">
               <FaDownload className=" text-white text-2xl cursor-pointer"/>
             </span>
            </div>

            

            <div className="text-gray-400 font-bold mb-4 flex gap-2 justify-center md:justify-start lg:justify-start">
              <span ><p>{runtime} minutes / </p></span> 
                <span><p>{spoken_languages?.map((language) => language.name).join(", ")}</p></span>
            </div>
             
             

            <p className="text-gray-200 leading-relaxed text-center md:text-left lg:text-left">
              {overview}
              {runtime} minutes

            </p>

            <div className="my-6 text-center md:text-left lg:text-left ">
              {production_companies?.map((company) => (
                <span
                  key={company.id}
                  className="text-white text-xl font-bold gap-2 justify-evenly"
                >
                {company.name} | {company.origin_country}
                </span>
              ))}
            </div>

            <div className="my-7 flex flex-wrap gap-3 justify-center md:justify-start lg:justify-start">
              {genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="border border-gray-700 rounded px-3 py-1"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="text-gray-300 text-sm-200 flex flex-wrap gap-5 justify-center md:justify-start lg:justify-start">
              <p>Vote-Count: {vote_count}</p>
              <p>Vote-Average: {vote_average}</p>
              <p>Popularity: {popularity}</p>
            </div>
            

           

          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesDetails;
