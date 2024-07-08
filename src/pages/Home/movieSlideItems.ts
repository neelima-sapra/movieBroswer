import image1 from "../../images/slideImage1.jpg"
import image2 from "../../images/slideImage2.jpg"

export interface singleSlideItem {
  poster: string
  alt: string
  title: string
  date?: string
  rating?: number
  favOnClick?: () => void
  isFav?: boolean
}

export const movieSlideItems: singleSlideItem[] = [
  {
    poster: image1,
    alt: "Slide 1",
    title: "Movie 1",
  },
  {
    poster: image2,
    alt: "Slide 2",
    title: "Movie 2",
  },
]

export const latestMovies: singleSlideItem[] = [
  {
    poster: image1,
    alt: "Slide 1",
    title: "Movie 1",
    rating: 70,
    date: "6th June 2024",
  },
  {
    poster: image2,
    alt: "Slide 2",
    title: "Movie 2",
    rating: 50,
    date: "1th April 2024",
  },
  {
    poster: image2,
    alt: "Slide 2",
    title: "Movie 2",
    rating: 50,
    date: "1th April 2024",
  },
  {
    poster: image1,
    alt: "Slide 1",
    title: "Movie 1",
    rating: 70,
    date: "6th June 2024",
  },
  {
    poster: image1,
    alt: "Slide 1",
    title: "Movie 1",
    rating: 70,
    date: "6th June 2024",
  },
  {
    poster: image2,
    alt: "Slide 2",
    title: "Movie 2",
    rating: 50,
    date: "1th April 2024",
  },
  {
    poster: image1,
    alt: "Slide 1",
    title: "Movie 1",
    rating: 70,
    date: "6th June 2024",
  },
  {
    poster: image2,
    alt: "Slide 2",
    title: "Movie 2",
    rating: 50,
    date: "1th April 2024",
  },
]
