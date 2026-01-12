
import { useEffect, useState } from "react";
import Card from "../components/Card"
import useFetch from "../hooks/useFetch";

 



const MoviesList = ({api, title})  => {

  const {data:movies} = useFetch(api)

  useEffect(() => {
    document.title = `${title} / cinebite`
  });


  return (
    
    <main>
      <section className="max-w-7xl max-auto py-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-5">

        

          {
            movies.map((movie) => (
              <Card key={movie.id} movie={movie}/>
            ))
          }



        </div>
      </section>
    </main>
  )
}

export default MoviesList