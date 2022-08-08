export interface TimeSplit {
  hours: string
  minutes: string
  seconds: string
}

export interface FeedbackInterface {
  status: 'success' | 'fail'
}

export interface InstitucionalNav {
  links: InstuticionalLink[]
}

export interface InstuticionalLink {
  href: string
  label: string
}

export interface StockFlagProps {
  unavailableText: string
}

export interface SimilarProductsProps {
  imageWidth: number
  imageHeight: number
  textTitle: string
  msgError: string
  msgLoading: string
}
