import React, { useCallback, useEffect, useState } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"
import SingleMovieCard from "../../common/singleMovieCard/SingleMovieCard"

import "./LatestMovies.scss"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import {
  addToFavourite,
  fetchGenreAsync,
  fetchMoviesAsync,
  searchMoviesAsync,
  selectGenres,
  selectMovies,
  selectStatus,
} from "../../../services/movieApiSlice"
import type { GenreType, MovieType } from "../../../app/response/tmdb.interface"
import { Constants } from "../../../utils/constants"

import placeHolderImg from "../../../images/placeholder.svg"
import LatestMoviesTitleWrap from "./latestMoviesTitleWrap/LatestMoviesTitleWrap"

const LatestMovies = () => {
  const dispatch = useAppDispatch()
  const movies: MovieType[] = useAppSelector(selectMovies)
  const genres: GenreType[] = useAppSelector(selectGenres)
  const status = useAppSelector(selectStatus)
  const [search, setSearch] = useState<string>("")
  const [page, setPage] = useState<number>(1)
  const [selectedGenres, setSelectedGenres] = useState<number[]>([])
  const [startYear, setStartYear] = useState<string>("")
  const [endYear, setEndYear] = useState<string>("")

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1979 }, (_, i) =>
    (currentYear - i).toString(),
  )

  const loadMovies = useCallback(() => {
    const params = {
      page,
      genres: selectedGenres,
      startYear,
      endYear,
    }

    if (search.length > 2) {
      dispatch(searchMoviesAsync({ query: search, ...params }))
    } else {
      dispatch(fetchMoviesAsync(params))
    }
  }, [dispatch, search, page, selectedGenres, startYear, endYear])

  useEffect(() => {
    loadMovies()
    dispatch(fetchGenreAsync())
  }, [loadMovies])

  useEffect(() => {
    setPage(1)
  }, [search, selectedGenres, startYear, endYear])

  const addToFav = (id: number) => {
    dispatch(addToFavourite(id))
  }

  const handleGenreToggle = (genreId: number) => {
    setSelectedGenres(prev =>
      prev.includes(genreId)
        ? prev.filter(id => id !== genreId)
        : [...prev, genreId],
    )
  }

  // Handle infinite scrolling
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      status !== "loading"
    ) {
      setPage(prevPage => prevPage + 1)
    }
  }

  useEffect(() => {
    // scroll event handler for infite scrolling
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="latestMoviesWrap pb-3 mt-3">
      <Container>
        <LatestMoviesTitleWrap
          searchText={search}
          setSearch={e => setSearch(e.target.value)}
        />
        <Row>
          <Col lg={2}>
            <div className="filterContainer">
              <h5>Genre</h5>
              <ul className="filterList">
                {genres &&
                  genres.map(genre => (
                    <li key={genre.id}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedGenres.includes(genre.id)}
                          onChange={() => handleGenreToggle(genre.id)}
                        />
                        {genre.name}
                      </label>
                    </li>
                  ))}
              </ul>

              <h5>Release Year</h5>
              <Form.Group className="mb-3">
                <Form.Label>From</Form.Label>
                <Form.Select
                  value={startYear}
                  onChange={e => setStartYear(e.target.value)}
                >
                  <option value="">Any</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>To</Form.Label>
                <Form.Select
                  value={endYear}
                  onChange={e => setEndYear(e.target.value)}
                >
                  <option value="">Any</option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
          <Col lg={10}>
            <div className="latestMoviesList">
              <Row>
                {movies && movies.length > 0 ? (
                  movies.map((movie, i) => (
                    <Col key={i} lg={3} md={6}>
                      <SingleMovieCard
                        poster={
                          movie.poster_path
                            ? Constants.TMDB_IMG_PREFIX + movie.poster_path
                            : placeHolderImg
                        }
                        alt={movie.original_title}
                        title={movie.original_title}
                        date={new Date(movie.release_date)
                          .getFullYear()
                          .toString()}
                        rating={Number(movie.vote_average.toFixed(1))}
                        favOnClick={() => addToFav(movie.id)}
                        isFav={movie.isFavourite}
                      />
                    </Col>
                  ))
                ) : (
                  <div className="noResultsFound">
                    <p>No Results found</p>
                  </div>
                )}
              </Row>
            </div>
          </Col>
        </Row>
        {status === "loading" && <p>Loading...</p>}
      </Container>
    </div>
  )
}

export default LatestMovies
