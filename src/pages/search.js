import { useRouter } from 'next/router'
import Layout from '../components/layout'
import MoviesListWithInfiniteScroll from '../components/movies-list-with-infinite-scroll'
import styles from '../styles/pages/search.module.css'

export default function Search() {
  const router = useRouter()
  const { q: query } = router.query

  return (
    <Layout>
      <div className="container">
        <h4 className={styles.h1}>Search results for {`"${query}"`}</h4>
        <MoviesListWithInfiniteScroll query={query} />
      </div>
    </Layout>
  )
}
