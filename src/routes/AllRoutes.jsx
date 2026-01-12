import { Routes, Route } from 'react-router-dom'
import { MovieDetails, MovieList, Search, PageNotFound } from '../pages'

export const AllRoutes = () => {

    return (
        <Routes>
            <Route path='/' element= {<MovieList api="movie/now_playing" title="Home"/>}/>

            <Route path='movie/:id' element= {<MovieDetails/>}/>

            <Route path='movies/popular' element= {<MovieList api="movie/popular" title="popular"/>}/>

            <Route path='movies/top' element= {<MovieList api="movie/top_rated" title="top rated"/>}/>

            <Route path='movies/upcoming' element= {<MovieList api="movie/upcoming" title="upcoming"/>}/>

            <Route path='/search' element= {<Search  api="search/movie"/>}/>
            
            <Route path='*' element= {<PageNotFound/>}/>

        </Routes>
    )
}

