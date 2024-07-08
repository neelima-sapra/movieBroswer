import React from "react"
import { Carousel, Container } from "react-bootstrap"
import SingleSlide from "./SingleSlide"
import { singleSlideItem } from "../../../pages/Home/movieSlideItems"

const Slider = ({ slideItems }: any) => {
  return (
    <Container>
      <Carousel className="pt-3 pb-3" keyboard>
        {slideItems.map((slide: singleSlideItem, index: number) => (
          <Carousel.Item interval={1500} key={index}>
            <SingleSlide
              poster={slide.poster}
              alt={slide.alt}
              title={slide.title}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  )
}

export default Slider
