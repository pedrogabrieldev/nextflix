import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/components/search-form.module.css'

export default function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const searchInput = useRef(null)

  const handleChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    router.push(`/search?q=${searchQuery}`)
    searchInput.current.blur()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleChange}
        ref={searchInput}
      />
    </form>
  )
}
