import React from "react"
import Header from "../../components/common/header/Header"
import Footer from "../../components/common/footer/Footer"
import LatestMovies from "../../components/homepage/latestMovies/LatestMovies"

export const Home = () => {
  return (
    <div className="homePage">
      <Header />
      <LatestMovies />
      <Footer />
    </div>
  )
}
