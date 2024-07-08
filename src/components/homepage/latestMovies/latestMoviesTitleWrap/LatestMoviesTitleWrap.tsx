import React from "react"

import "./LatestMoviesTitleWrap.css"

type LatestMoviesTitleWrapProps = {
  searchText: string
  setSearch: (e: any) => void
}

const LatestMoviesTitleWrap = (props: LatestMoviesTitleWrapProps) => {
  return (
    <div className="latestMoviesTitleWrap">
      <h2>All Movies</h2>
      <div className="searchMoviewsInputWrap">
        <p className="mb-0 me-2">Search for your favourite movies:</p>
        <input
          type="text"
          value={props.searchText}
          onChange={props.setSearch}
          placeholder="Start typing minimum 3 characters"
          min={3}
        />
      </div>
    </div>
  )
}

export default LatestMoviesTitleWrap
