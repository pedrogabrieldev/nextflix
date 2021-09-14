export default async (req, res) => {
  const { q, page } = req.query
  const url = q
    ? `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_APIKEY}&query=${q}&page=${page}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_APIKEY}&language=en-US&page=${page}`
  const result = await fetch(url)
  const json = await result.json()
  const movies = json.results

  res.json(movies)
}
