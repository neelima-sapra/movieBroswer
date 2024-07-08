import axios from "axios"
import { Constants } from "./constants"

export const getAxiosRequest = (url: string, params?: {}) => {
  return axios.get(url, {
    params: {
      api_key: Constants.TMDB_API_KEY,
      ...params,
    },
  })
}
