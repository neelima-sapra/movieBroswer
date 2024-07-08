import React from "react"
import Header from "../../components/common/header/Header"
import Footer from "../../components/common/footer/Footer"
import Slider from "../../components/common/slideshow/Slider"
import { movieSlideItems } from "./movieSlideItems"
import LatestMovies from "../../components/homepage/latestMovies/LatestMovies"
import { SampleRedux } from "../SampleRedux"

export const Home = () => {
  return (
    <div className="homePage">
      <Header />
      <Slider slideItems={movieSlideItems} />
      <LatestMovies />
      <Footer />
    </div>
  )
}
