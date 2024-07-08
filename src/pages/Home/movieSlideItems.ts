export interface singleSlideItem {
  poster: string
  alt: string
  title: string
  date?: string
  rating?: number
  favOnClick?: () => void
  isFav?: boolean
}
