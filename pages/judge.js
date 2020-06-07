import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMovies from '../components/CompetitionMovies'
import db from '../lib/db'
import { getTargets, addJudgement } from '../lib/competitionsDAO'
// import { getTargets, addJudgement } from '../lib/mockVompetitionsDAO'

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
        ['comment_' + videoId]: ''
      }
    )
  }

  let ratingStats = {};
  targets.map((target) => initialRatingState(target.videoID))
    .forEach(state => Object.assign(ratingStats, state));
  const [ratingState, setRatingState] = useState(ratingStats);

  const rating = (event) => {
    // event.target.id のフォーマット: {category}_{videoID}-[0-9]
    // 状態管理のIDとしては横並びの★ごとを一意に識別する下二桁が不要。
    const targetId = event.target.id.slice(0, -2);
    setRatingState(Object.assign(ratingState, {[targetId]: event.target.value}))
  }

  const comment = (event) => {
    // コメント欄の場合は下二桁に一意識別のための数値がないため、そのままtarget.idを渡す。
    const targetId = event.target.id;
    setRatingState(Object.assign(ratingState, {[targetId]: event.target.value}))
  }

  const [judgerName, setJudgerName] = useState('');
  const judger = (event) => {
    setJudgerName(event.target.value)
  }

  const postJudge = () => {
    const targetData = [];
    targets.forEach(target => {
      // targetDataに値を設定
      let data = {
        videoID: target.videoID,
        title: target.title,
      }
      for (let rawkey in ratingState) {
        const reg = new RegExp(`_${target.videoID}`)
        if(rawkey.search(reg) !== -1) {
          const key = rawkey.replace(reg, '');
          data[key] = ratingState[rawkey];  
        }
      }
      targetData.push(data)
    });

    const judgementData = {
      competitionID: id,
      title: title,
      judgerName: judgerName,
      target: targetData
    };
    addJudgement(db, judgementData);
    router.push(href)
  }

  return (
    <Layout>
      <CompetitionTitle title={title} />
      <CompetitionMovies targets={targets}
        ratingHandler={rating} judgerHandler={judger} commentHandler={comment}/>
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