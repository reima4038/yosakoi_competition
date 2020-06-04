import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMovies from '../components/CompetitionMovies'
import db from '../lib/db'
import { getTargets, addResults } from '../lib/competitionsDAO'
// import { getTargets, addTargets } from '../lib/mockCompetitionsDAO'

export default function Judge({id, title, targets}) {
  const router = useRouter();
  const query = {
    id: id,
    title: title
  }
  const href = { pathname: '/competitions', query: query }

  const initialRatingState = (videoId) => {
    return (
      {
        ['smile_' + videoId]: 2,
        ['heat_' + videoId]: 2,
        ['oneness_' + videoId]: 2,
      }
    )
  }

  let ratingStats = {};
  targets.map((target) => initialRatingState(target.videoID))
    .forEach(state => Object.assign(ratingStats, state));
  const [ratingState, setRatingState] = useState(ratingStats);

  const rating = (event, newValue) => {
    // event.target.id のフォーマット: {category}_{videoID}-[0-9]
    // 状態管理のIDとしては横並びの★ごとを一意に識別する下二桁が不要。
    const targetId = event.target.id.slice(0, -2);
    setRatingState(Object.assign(ratingState, {[targetId]: newValue}))
  }

  const [judgerName, setJudgerName] = useState('');
  const judger = (event) => {
    setJudgerName(event.target.value)
  }

  const buildData = (videoID) => {
    let data = {
      judgerName: judgerName,
      comment: '',
      smile: '',
      heat: '',
      oneness: ''
    };
    for (let rawkey in ratingState) {
      const reg = new RegExp(`_${videoID}`)
      const key = rawkey.replace(reg, '');
      data[key] = ratingState[rawkey];
    }
    return data;
  }

  const postJudge = () => {
    targets.forEach(target => {
      addResults(db, id, target.id, buildData(target.videoID));      
    });
    router.push(href)
  }

  return (
    <Layout>
      <CompetitionTitle title={title} />
      <CompetitionMovies targets={targets}
        rating={rating} judger={judger}/>
      <Link href={href}>
        <button>戻る</button>
      </Link>
      <button onClick={() => postJudge(judgerName)}>登録</button>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const targets = await getTargets(db, context.query.id)
  return {
    props: {
      id: context.query.id,
      title: context.query.title,
      targets: targets
    }
  }
}