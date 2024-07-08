import type {
  MovieParams,
  TMDBGenreResponseInterface,
  TMDBResponseInterface,
} from "../app/response/tmdb.interface"
import { getAxiosRequest } from "../utils"
import { Constants } from "../utils/constants"

export const fetchMovies = async ({
  page = 1,
  genres = [],
  startYear,
  endYear,
}: MovieParams) => {
  const url = Constants.TMDB_HOST + Constants.TMDB_GET_ALL

  const params: any = {
    sort_by: "popularity.desc",
    page,
    with_genres: genres.join(","),
  }

  if (startYear) params["primary_release_date.gte"] = `${startYear}-01-01`
  if (endYear) params["primary_release_date.lte"] = `${endYear}-12-31`

  return new Promise<{ data: TMDBResponseInterface }>(resolve => {
    return resolve(getAxiosRequest(url, params))
  })
}

export const searchMovies = async (
  query: string,
  { page = 1, genres = [], startYear, endYear }: MovieParams,
) => {
  const url = Constants.TMDB_HOST + Constants.TMDB_SEARCH

  const params: any = {
    query,
    sort_by: "popularity.desc",
    page,
    with_genres: genres.join(","),
  }

  if (startYear) params["primary_release_date.gte"] = `${startYear}-01-01`
  if (endYear) params["primary_release_date.lte"] = `${endYear}-12-31`

  return new Promise<{ data: TMDBResponseInterface }>(resolve => {
    return resolve(getAxiosRequest(url, params))
  })
}

export const fetchGenre = async () => {
  const url = Constants.TMDB_HOST + Constants.TMDB_GENRE

  return new Promise<{ data: TMDBGenreResponseInterface }>(resolve => {
    return resolve(getAxiosRequest(url))
  })
}
