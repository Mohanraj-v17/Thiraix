import { useSearchParams } from "react-router-dom";
import Card from "../components/Card"
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";


const Search = ({api}) => {

  const [searchParams] = useSearchParams();

  const queryTerm = searchParams.get("q");
  
   const {data:movies} = useFetch(api, queryTerm);

      
  useEffect(() => {
    document.title = `${queryTerm} / cinebite`
  })


  return (
    <main>

   <section>
    <p className="text-3xl text-gray-900">
      {movies.length === 0 ? `no result for ( ${queryTerm} )` : `results for ( ${queryTerm} )`}
    </p>
   </section>



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

export default Search