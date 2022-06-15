import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/components/movies-list-view.module.css'

export default function MoviesListView({ movies }) {
  return (
    <ul className={styles.ul}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/${movie.id}`}>
            <a>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={330}
                height={440}
              />
            </a>
          </Link>
        </li>
      ))}
    </ul>
  )
}
