import type { TMDBResponseInterface } from "../app/response/tmdb.interface"
import { getAxiosRequest } from "../utils"
import { Constants } from "../utils/constants"

export const fetchMovies = async () => {
  const url = Constants.TMDB_HOST + Constants.TMDB_GET_ALL

  return new Promise<{ data: TMDBResponseInterface }>(resolve => {
    return resolve(getAxiosRequest(url, { sort_by: "popularity.desc" }))
  })
}

export const searchMovies = async (query: string) => {
  const url = Constants.TMDB_HOST + Constants.TMDB_SEARCH

  return new Promise<{ data: TMDBResponseInterface }>(resolve => {
    return resolve(getAxiosRequest(url, { query, sort_by: "popularity.desc" }))
  })
}
