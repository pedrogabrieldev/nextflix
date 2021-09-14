import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import SearchForm from './search-form'
import styles from '../styles/components/navbar.module.css'

export default function Navbar() {
  const prevScrollY = useRef(0)
  const [goingDown, setGoingDown] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (prevScrollY.current < currentScrollY && !goingDown) {
        setGoingDown(true)
      }
      if (prevScrollY.current > currentScrollY && goingDown) {
        setGoingDown(false)
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [goingDown])

  return (
    <nav
      className={goingDown ? `${styles.nav} ${styles.down}` : `${styles.nav}`}
    >
      <Link href="/">
        <a>NEXTFLIX</a>
      </Link>
      <SearchForm />
    </nav>
  )
}
