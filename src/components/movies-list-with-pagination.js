import { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '../lib/fetcher'
import MoviesListView from './movies-list-view'
import styles from '../styles/components/movies-list-with-pagination.module.css'

export default function MoviesListWithPagination({ query }) {
  const { movies, isLoading, pageIndex, setPageIndex } = usePaginatedMovies(
    query
  )

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>
  }

  return (
    <>
      <MoviesListView movies={movies} />
      {!isLoading && (
        <div className={styles.buttons}>
          <button onClick={() => setPageIndex(pageIndex - 1)}>Previous</button>
          <button onClick={() => setPageIndex(pageIndex + 1)}>Next</button>
        </div>
      )}
    </>
  )
}

function usePaginatedMovies(query) {
  const [pageIndex, setPageIndex] = useState(1)
  const apiEndpoint = query
    ? `/api/movies?q=${query}&page=${pageIndex}`
    : `/api/movies?page=${pageIndex}`
  const { data, error } = useSWR(apiEndpoint, fetcher)
  const movies = data
  const isLoading = !data && !error

  return {
    movies,
    isLoading,
    pageIndex,
    setPageIndex,
    error,
  }
}
