import Layout from '../components/layout'
import MoviesListWithInfiniteScroll from '../components/movies-list-with-infinite-scroll'

export default function Home() {
  return (
    <Layout>
      <div className="container">
        <MoviesListWithInfiniteScroll />
      </div>
    </Layout>
  )
}
