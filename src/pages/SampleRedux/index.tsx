import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  addToFavourite,
  fetchMoviesAsync,
  searchMoviesAsync,
  selectMovies,
} from "../../services/movieApiSlice"
import SingleMovieCard from "../../components/common/singleMovieCard/SingleMovieCard"

import image1 from "../../images/slideImage1.jpg"

export const SampleRedux = () => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(selectMovies)
  console.log("🚀 ~ SampleRedux ~ movies:", movies)

  const [search, setSearch] = useState("")

  useEffect(() => {
    dispatch(fetchMoviesAsync())
  }, [])

  useEffect(() => {
    console.log(search)

    if (search.length > 2) {
      dispatch(searchMoviesAsync(search))
    }

    if (search.length === 0) {
      dispatch(fetchMoviesAsync())
    }
  }, [search])

  const addToFav = (id: number) => {
    dispatch(addToFavourite(id))
  }

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="please enter minimum 3 characters"
        min={3}
        width="300px"
      />
      <div className="latestMoviesList d-flex">
        {movies &&
          movies.map(movie => (
            <SingleMovieCard
              poster={image1}
              alt={movie.original_title}
              title={movie.original_title}
              date={movie.release_date.toString()}
              rating={Math.round(movie.vote_average)}
            />
            // <li key={movi e.id}>
            //   {movie.title}{" "}
            //   <button onClick={() => addToFav(movie.id)}>
            //     {movie.isFavourite ? "remove from" : "add to"} favourite
            //   </button>
            // </li>
          ))}
      </div>
    </div>
  )
}
