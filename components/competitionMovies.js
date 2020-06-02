import { useState, useEffect } from 'react'
import db from '../lib/db'
// import { getTargets } from '../lib/competitionsDAO'
import { getTargets } from '../lib/mockCompetitionsDAO'
import CompetitionMovie from './competitionMovie'
import CompetitionTargetNumbers from '../components/competitionTargetsNumbers'

// 評価対象の演舞リスト
export default function competitionMovies(props) {
  const [movieTags, setMovieTags] = useState([]);

  useEffect(() => {
    getTargets(db, props.competitionID).then(refs => {
      let movieTags = [];
      refs.forEach(ref => { 
        movieTags.push(
          <React.Fragment key={ref.videoID}>
            <h3>{ref.title}</h3>
            <CompetitionMovie videoID={ref.videoID} />
            <hr />
          </React.Fragment>
        );
      });
      setMovieTags(movieTags)
    })
  })

  return (
    <div>
      <CompetitionTargetNumbers numbers={movieTags.length}/>
      {movieTags}
    </div>
  );
}