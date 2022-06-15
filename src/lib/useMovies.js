import useSWRInfinite from 'swr/infinite'
import fetcher from './fetcher'

export function useMovies(query) {
  // A function to get the SWR key of each page,
  // its return value will be accepted by `fetcher`.
  // If `null` is returned, the request of that page won't start.
  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null // reached the end
    return query
      ? `/api/movies?q=${query}&page=${pageIndex + 1}` //SWR key
      : `/api/movies?page=${pageIndex + 1}` // SWR key
  }
  // The number of movies returned by the api for each page
  const PAGE_SIZE = 20

  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    getKey,
    fetcher
  )

  const movies = data ? [].concat(...data) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)
  const isRefreshing = isValidating && data && data.length === size

  const loadMore = () => setSize(size + 1)

  return {
    movies,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore,
    error,
    mutate,
    size,
    setSize,
    isValidating,
  }
}
