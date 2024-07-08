export interface MovieType {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
  isFavourite?: boolean
}

export interface GenreType {
  id: number
  name: string
}

export interface TMDBResponseInterface {
  results: MovieType[]
  page: number
  total_pages: number
  total_results: number
}

export interface TMDBGenreResponseInterface {
  genres: GenreType[]
}

export interface MovieParams {
  page: number
  genres?: number[]
  startYear?: string
  endYear?: string
}
