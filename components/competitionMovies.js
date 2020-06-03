import { useState, useEffect } from 'react'
import db from '../lib/db'
// import { getTargets } from '../lib/competitionsDAO'
import { getTargets } from '../lib/mockCompetitionsDAO'
import CompetitionMovie from './competitionMovie'
import CompetitionTargetNumbers from '../components/competitionTargetsNumbers'

// 評価対象の演舞リスト
export default function competitionMovies(props) {

  const [ratingState, setRatingState] = useState({});
  const initialRatingState = (i) => {
    return (
      {
        ['smile_' + i]: 2,
        ['heat_' + i]: 2,
        ['oneness_' + i]: 2,
        ['groupDancing_' + i]: 2,
        ['tech_' + i]: 2,
        ['structure_' + i]: 2
      }
    )
  }
  const rating = (event, newValue) => {
    // event.target.id のフォーマット: {category}_{videoID}-[0-9]
    // 状態管理のIDとしては横並びの★ごとを一意に識別する下二桁が不要。
    const targetId = event.target.id.slice(0, -2);
    console.log('target is ' + targetId);
    console.log('newValue is ' + newValue);
    setRatingState(Object.assign(ratingState, {[targetId]: newValue}));
    console.log(ratingState)

  }

  //TODO 更に親のコンポーネントでのステート管理
  //TODO 子のコンポーネントの値が書き換わらないのはなぜか。

  const [movieTags, setMovieTags] = useState([]);
  const structMovieTag = (videoID, title) => {
    return (
      <React.Fragment key={videoID}>
        <h3>{title}</h3>
        <CompetitionMovie videoID={videoID} ratingState={ratingState} onChange={rating} />
        <hr />
      </React.Fragment>
      )
  }

  useEffect(() => {
    // 初期化時にだけ動けばよい。データ取り終わった後は実行しない。
    if(Object.keys(ratingState).length > 0 && movieTags.length > 0) {
      return;
    }
    
    getTargets(db, props.competitionID).then(refs => {
      refs.map(ref => initialRatingState(ref.videoID))
        .forEach(initState => {
          setRatingState(Object.assign(ratingState, initState))
        })

      let movieTags = [];
      refs.map(ref => structMovieTag(ref.videoID, ref.title))
        .forEach(tag => movieTags.push(tag))
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