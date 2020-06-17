import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Button,
  Grid
} from '@material-ui/core'

import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMovies from '../components/competitionMovies'
import db from '../lib/db'
import { addJudgement, getCompetition } from '../lib/competitionsDAO'
// import { getTargets, addJudgement } from '../lib/mockCompetitionsDAO'

const useStyles = makeStyles({
  root:{
    padding: '16px 16px 16px 16px'
  }
});

export default function Judge({id, title, targets}) {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const router = useRouter();
  const query = {
    id: id
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
      <Paper className={classes.root} >
        <CompetitionTitle title={title} />
      </Paper>
      <CompetitionMovies targets={targets}
        ratingHandler={rating}
        judgerHandler={judger}
        commentHandler={comment}
        register={register}
        errors={errors}/>
      <Paper className={classes.root}>
        <Grid container justify="center" spacing={8}>
          <Grid item key="back">
            <Link href={href}>
              <Button variant="outlined" color="primary">戻る</Button>
            </Link>
          </Grid>
          <Grid item key="register">
            <Button variant="contained" onClick={handleSubmit(postJudge)} color="primary">登録</Button>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const competitionID = context.query.id;
  const competition = await getCompetition(db, competitionID);
  return {
    props: {
      id: context.query.id,
      title: context.query.title,
      targets: competition.targets
    }
  }
}