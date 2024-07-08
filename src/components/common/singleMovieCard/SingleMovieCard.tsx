import React from "react"
import type { singleSlideItem } from "../../../pages/Home/movieSlideItems"
import starIcon from "../../../images/star-fill.svg"
import heartIcon from "../../../images/heart.svg"

import "./SingleMovieCard.scss"

const SingleMovieCard = (props: singleSlideItem) => {
  return (
    <div className="singleMovieCard mt-4">
      <div className="singleMovieCardImage">
        <img src={props.poster} alt={props.alt} />
      </div>
      <div className="singleMovieCardDetailsRating">
        <img src={starIcon} alt="Rating" />
        <span>{props.rating}</span>
      </div>
      <div className="singleMovieCardDetails">
        <div className="singleMovieCardDetailsTitle">
          <button
            className={`${props.isFav && "favSelected"}`}
            onClick={props.favOnClick}
          >
            {props.isFav ? (
              <img
                className="orangeIcon"
                src={heartIcon}
                alt="Remove to Favourite"
              />
            ) : (
              <img src={heartIcon} alt="Add to Favourite" />
            )}
          </button>
          <h5>{props.title}</h5>
          <p>{props.date}</p>
        </div>
      </div>
    </div>
  )
}

export default SingleMovieCard
