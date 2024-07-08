import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../app/createAppSlice"
import type { MovieType } from "../app/response/tmdb.interface"
import { fetchMovies, searchMovies } from "./tmdb"

export interface MovieSliceState {
  movies: MovieType[] // You might want to define a proper type for movies
  page: number
  total_pages: number
  total_results: number

  status: "idle" | "loading" | "failed"
}

const initialState: MovieSliceState = {
  movies: [],
  page: 0,
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
      async () => {
        const response = await fetchMovies()
        console.log("🚀 ~ response:", response)
        // The value we return becomes the `fulfilled` action payload
        return response.data?.results
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.movies = action.payload as any
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),

    // search movies
    searchMoviesAsync: create.asyncThunk(
      async (query: string) => {
        const response = await searchMovies(query)
        console.log("🚀 ~ response:", response.data?.results)
        // The value we return becomes the `fulfilled` action payload
        return response.data?.results
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.movies = action.payload as any
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
  },
})

// Action creators are generated for each case reducer function
export const { fetchMoviesAsync, searchMoviesAsync, addToFavourite } =
  movieSlice.actions

// Selectors returned by `slice.selectors` take the root state as their first argument
export const { selectMovies, selectStatus } = movieSlice.selectors
