import { useRouter } from 'next/router'
import fetcher from '../lib/fetcher'
import Layout from '../components/layout'
import MovieView from '../components/movie-view'

export default function Movie({ movie }) {
  const { isFallback } = useRouter()

  return (
    <Layout>
      <div className="container">
        {isFallback ? (
          <p>Loading...</p>
        ) : movie.id ? (
          <MovieView movie={movie} />
        ) : (
          <p>Movie not found</p>
        )}
      </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${process.env.TMDB_APIKEY}&language=en-US&append_to_response=credits`
  const json = await fetcher(url)

  return {
    props: {
      movie: json,
    },
  }
}
