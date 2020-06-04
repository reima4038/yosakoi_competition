import { useState, useEffect } from 'react'
import db from '../lib/db'
import { getTargets } from '../lib/competitionsDAO'
// import { getTargets } from '../lib/mockCompetitionsDAO'

// 審査対象
export default function competitionTargets(props) {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getTargets(db, props.competitionID).then(refs => {
      let movies = [];
      refs.forEach(ref => { movies.push(ref.title) });
      setMovies(movies)
    })
  })

  // 演舞動画リスト
  let moviesListTags = [];
  movies.forEach(movie => {
    moviesListTags.push(<li>{movie}</li>)
  })
  
  return (
    <div>
        <h2>審査対象</h2>
        <ul>
          {moviesListTags}
        </ul>
    </div>
  )
}