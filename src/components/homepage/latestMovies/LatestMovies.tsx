import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { latestMovies } from "../../../pages/Home/movieSlideItems"
import SingleMovieCard from "../../common/singleMovieCard/SingleMovieCard"

import "./LatestMovies.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addToFavourite,
  fetchMoviesAsync,
  searchMoviesAsync,
  selectMovies,
} from "../../../services/movieApiSlice"
import { MovieType } from "../../../app/response/tmdb.interface"

import image1 from "../../../images/slideImage1.jpg"

const LatestMovies = () => {
  const dispatch = useAppDispatch()
  const movies: MovieType[] = useAppSelector(selectMovies)

  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    dispatch(fetchMoviesAsync())
  }, [])

  useEffect(() => {
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
    <div className="latestMoviesWrap pb-3 mt-3">
      <Container>
        <div className="latestMoviesTitleWrap">
          <h2>All Movies</h2>
          <div className="searchMoviewsInputWrap">
            <p className="mb-0 me-2">Search for your favourite movies:</p>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Start typing minimum 3 characters"
              min={3}
            />
          </div>
        </div>
        <div className="latestMoviesList d-flex">
          {movies && movies.length > 0 ? (
            movies.map(movie => (
              <SingleMovieCard
                key={movie.id}
                poster={image1}
                alt={movie.original_title}
                title={movie.original_title}
                date={movie.release_date.toString()}
                rating={Number(movie.vote_average.toFixed(1))}
                favOnClick={() => addToFav(movie.id)}
                isFav={movie.isFavourite}
              />
              // <li key={movi e.id}>
              //   {movie.title}{" "}
              //   <button onClick={() => addToFav(movie.id)}>
              //     {movie.isFavourite ? "remove from" : "add to"} favourite
              //   </button>
              // </li>
            ))
          ) : (
            <div className="noResultsFound">
              <p>No Results found</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default LatestMovies
