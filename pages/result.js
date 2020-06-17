import Link from 'next/link'
import { makeStyles } from '@material-ui/core/styles'
import {
  Paper,
  Button,
  Box
} from '@material-ui/core'

import Layout from "../components/layout";
import db from '../lib/db'
// import { getJudgement } from '../lib/mockCompetitionsDAO'
import { getJudgement } from '../lib/competitionsDAO'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMoviesViewOnly from '../components/competitionMoviesReadOnly'

const useStyles = makeStyles({
  root:{
    padding: '16px 16px 16px 16px'
  }
});


export default function Result({ id, title, judgement }) {
  const classes = useStyles();

  const href = {
    pathname: '/competitions',
    query: {
      id: id,
    }
  }
  return (
    <Layout>
      <Paper className={classes.root} >
        <CompetitionTitle title={title} />
      </Paper>
      <CompetitionMoviesViewOnly targets={judgement.target} judgerName={judgement.judgerName}/>
      <Paper className={classes.root}>
        <Box textAlign="center">
          <Link href={href}><button>戻る</button></Link>
        </Box>
      </Paper>
    </Layout>
  )  
}

export async function getServerSideProps(context) {
  const judgements = await getJudgement(db, context.query.id);
  const judgerName = context.query.judgerName;
  // 同名で複数の投稿があった場合先頭のデータを採用する。
  // 本実装のときには審査員もidで比較するか、登録済ユーザは審査できないように仕様を定める。
  const filtered = judgements.filter(judgement => judgement.judgerName == judgerName);
  return {
    props: {
      id: context.query.id,
      title: context.query.title,
      judgement: filtered.length > 0 ? filtered[0] : null
    }
  }
}