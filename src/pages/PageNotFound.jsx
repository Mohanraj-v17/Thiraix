import { Link } from "react-router-dom";
import  PNF  from "../assets/404.avif";
import { useEffect } from "react";



const PageNotFound = () => {

  useEffect(() => {
    document.title = `404 Page Not Found / cinebite`
  });
  
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="text-center">
      <img className="mb-4"src={PNF} alt="404" height={"400px"}/>
       <Link to="/">
       <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
        focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600
         dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go back to home</button>
      </Link>
        </section>
    </main>
  )
}

export default PageNotFound