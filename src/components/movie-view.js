import { useState } from 'react'
import Image from 'next/image'
import styles from '../styles/components/movie-view.module.css'

export default function MovieView({ movie }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.posterDiv}>
        <Image
          src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          alt={movie.title}
          width={450}
          height={600}
          layout="fill"
        />
      </div>
      <div className={styles.info}>
        <h2>{movie.title}</h2>
        <div className={styles.details}>
          <p>{movie.release_date.split('-')[0]}</p>
          <p>{`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}min`}</p>
        </div>
        <p className={styles.fullplot}>{movie.overview}</p>
      </div>
    </div>
  )
}
