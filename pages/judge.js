import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMovies from '../components/CompetitionMovies'
import db from '../lib/db'
import { getTargets, addTargets } from '../lib/mockCompetitionsDAO'

export default function Judge({id, title, targets}) {
  const router = useRouter();
  const query = {
    id: id,
    title: title
  }
  const href = { pathname: '/competitions', query: query }
  const handleClick = (e) => {
    // TODO: 評価送信 （上書き保存）
    targets.forEach(target => {
      // TODO: ratingStateから変換する
      const data = {
        comment: '',
        smile: 2,
        heat: 1,
        oneness_: 3
      };
      addResults(db, id, target.id, data);      
    });
    router.push(href)
  }

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

  return (
    <Layout>
      <CompetitionTitle title={title} />
      <CompetitionMovies targets={targets} rating={rating}/>
      <Link href={href}>
        <button>戻る</button>
      </Link>
      <button onClick={handleClick}>登録</button>
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