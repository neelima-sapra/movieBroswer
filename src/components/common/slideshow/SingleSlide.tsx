import React from "react"
import { Carousel, Image } from "react-bootstrap"
import { singleSlideItem } from "../../../pages/Home/movieSlideItems"

import "./Slider.scss"

const SingleSlide = (props: singleSlideItem) => {
  return (
    <div className="singleSlideWrap">
      <img src={props.poster} alt={props.alt} height={500} />
      <Carousel.Caption>
        <h2>{props.title}</h2>
      </Carousel.Caption>
    </div>
  )
}

export default SingleSlide
