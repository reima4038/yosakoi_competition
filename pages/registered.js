import Link from 'next/link'
import { Typography, Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Layout from '../components/layout'
import CompetitionPageURL from '../components/competitionPageURL'

const useStyles = makeStyles({
  root: {
    padding: '16px 16px 16px 16px'
  },
  url: {
    paddingTop: '16px'
  },
  competitionLink: {
    marginTop: '32px',
    marginBottom: '320px'
  }
})

export default function Registered ({ id, title }) {
  const classes = useStyles();

  return (
    <Layout>
      <Paper className={classes.root}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">審査ページの作成が完了しました。</Box>
        </Typography>
        <Typography variant="p">下記のURLを共有して審査を始めましょう。</Typography>
        <Box className={classes.url}>
          <CompetitionPageURL competitionID={ id } />
        </Box>
        <Link href={{ 
          pathname: '/competitions',
          query: {
            id: id,
          }
        }}>
          <a>
            <Typography variant="h6">
              <Box className={classes.competitionLink} textAlign="center">
                審査ページへ
              </Box>
            </Typography>
          </a></Link>
      </Paper>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
      title: context.query.title
    }
  }
}
