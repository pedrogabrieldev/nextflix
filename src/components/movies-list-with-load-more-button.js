import { useMovies } from '../lib/useMovies'
import MoviesListView from './movies-list-view'
import styles from '../styles/components/movies-list-with-load-more-button.module.css'

export default function MoviesListWithLoadMoreButton({ query }) {
  const {
    movies,
    isLoadingInitialData,
    isLoadingMore,
    isEmpty,
    isReachingEnd,
    isRefreshing,
    loadMore,
    error,
    size,
    setSize,
  } = useMovies(query)

  if (isLoadingInitialData) {
    return <p className={styles.loading}>Loading...</p>
  }

  return (
    <>
      <MoviesListView movies={movies} />
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={loadMore}
        className={styles.btn}
      >
        {isLoadingMore
          ? 'Loading...'
          : isReachingEnd
          ? 'The end'
          : 'Load more...'}
      </button>
    </>
  )
}
