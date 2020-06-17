import Link from 'next/link'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'

import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargets from '../components/competitionTargets'
import CompetitionPageURL from '../components/competitionPageURL'
import CompetitionResults from '../components/competitionResults'
import CompetitionResultGraph from '../components/competitionResultGraph'

import db from '../lib/db'
// import { getJudgement, getCompetition } from '../lib/mockCompetitionsDAO'
import { getJudgement, getCompetition } from '../lib/competitionsDAO'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 16px 16px 16px'
  },
}));

export default function Competitions({ id, title, targets, judgements }) {
  const classes = useStyles();

  const query = {
    id: id,
    title: title
  }

  return (
    <Layout>
      <Paper className={classes.root}>
        <CompetitionTitle title={title} />
      </Paper>
      <Paper className={classes.root}>
        <CompetitionTargets targets={targets} />
        <Box textAlign="center">
          <Link href={{ pathname: "/judge", query: query }}>
              <Button variant="contained" color="primary">審査する</Button>
          </Link>
        </Box>
      </Paper>
      <Paper className={classes.root}>
        <CompetitionResults judgements={judgements}/>
      </Paper>
      <Paper className={classes.root}>
        <CompetitionResultGraph targets={targets} judgements={judgements} />
      </Paper>
      <Paper className={classes.root}>
        <CompetitionPageURL competitionID={id}/>
      </Paper>
      <Box textAlign="center" className={classes.root}>
        <Link href='/'>
          <Button variant="contained" color="primary">戻る</Button>
        </Link>
      </Box>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const competitionID = context.query.id;
  const competition = await getCompetition(db, competitionID);
  const judgements = await getJudgement(db, competitionID);

  return {
    props: {
      id: competitionID,
      title: competition.title,
      targets: competition.targets,
      judgements: judgements
    }
  }
}