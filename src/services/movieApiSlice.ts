import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../app/createAppSlice"
import type {
  GenreType,
  MovieParams,
  MovieType,
} from "../app/response/tmdb.interface"
import { fetchGenre, fetchMovies, searchMovies } from "./tmdb"

export interface MovieSliceState {
  movies: MovieType[] // You might want to define a proper type for movies
  genres: GenreType[] // You might want to define a proper type for movies
  page: number
  total_pages: number
  total_results: number
  status: "idle" | "loading" | "failed"
}

const initialState: MovieSliceState = {
  movies: [],
  genres: [],
  page: 1,
  total_pages: 0,
  total_results: 0,
  status: "idle",
}

export const movieSlice = createAppSlice({
  name: "movies",
  initialState,
  reducers: create => ({
    // You can keep other reducers if needed

    // fetch movies
    fetchMoviesAsync: create.asyncThunk(
      async (params: MovieParams) => {
        const response = await fetchMovies(params)
        console.log("🚀 ~ response:", params, response.data)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          // assign movies, page number and total count to the state
          state.status = "idle"
          state.movies =
            action.payload.page === 1
              ? action.payload.results
              : [...state.movies, ...action.payload.results]
          state.page = action.payload.page
          state.total_pages = action.payload.total_pages
          state.total_results = action.payload.total_results
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),

    // search movies
    searchMoviesAsync: create.asyncThunk(
      async ({ query, ...params }: { query: string } & MovieParams) => {
        const response = await searchMovies(query, params)
        console.log("🚀 ~ response:", params, response.data)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          // assign movies, page number and total count to the state
          state.status = "idle"
          state.movies =
            action.payload.page === 1
              ? action.payload.results
              : [...state.movies, ...action.payload.results]
          state.page = action.payload.page
          state.total_pages = action.payload.total_pages
          state.total_results = action.payload.total_results
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),

    // fetchGenre
    fetchGenreAsync: create.asyncThunk(
      async () => {
        const response = await fetchGenre()
        console.log("🚀 ~ response:", response.data?.genres)
        // The value we return becomes the `fulfilled` action payload
        return response.data
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          // assign movies, page number and total count to the state
          state.status = "idle"
          state.genres = action.payload.genres
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),

    // add to favourite
    addToFavourite: create.reducer((state, action: PayloadAction<number>) => {
      const movieIndex = state.movies.findIndex(
        movie => movie.id === action.payload,
      )
      if (movieIndex !== -1) {
        state.movies[movieIndex] = {
          ...state.movies[movieIndex],
          isFavourite: !state.movies[movieIndex].isFavourite,
        }
      }
    }),
  }),
  // You can define your selectors here
  selectors: {
    selectMovies: state => state.movies,
    selectStatus: state => state.status,
    selectGenres: state => state.genres,
  },
})

// Action creators are generated for each case reducer function
export const {
  fetchMoviesAsync,
  searchMoviesAsync,
  addToFavourite,
  fetchGenreAsync,
} = movieSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument
export const { selectMovies, selectStatus, selectGenres } = movieSlice.selectors
