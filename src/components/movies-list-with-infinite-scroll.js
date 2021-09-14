import { useRef, useCallback } from 'react'
import { useMovies } from '../lib/useMovies'
import MoviesListView from './movies-list-view'
import styles from '../styles/components/movies-list-with-infinite-scroll.module.css'

export default function MoviesListWithInfiniteScroll({ query }) {
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

  const observer = useRef()
  const ref = useCallback(
    (node) => {
      if (isLoadingInitialData || isLoadingMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isReachingEnd) {
          loadMore()
        }
      })
      if (node) observer.current.observe(node)
    },
    [isLoadingInitialData, isLoadingMore, isReachingEnd]
  )

  if (isLoadingInitialData) {
    return <p className={styles.loading}>Loading...</p>
  }

  return (
    <>
      <MoviesListView movies={movies} />
      <div ref={ref} className={styles.observer}>
        {isLoadingMore && 'Loading...'}
      </div>
    </>
  )
}
