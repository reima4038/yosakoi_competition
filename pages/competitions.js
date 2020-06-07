import Link from 'next/link'

import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargets from '../components/competitionTargets'
import CompetitionPageURL from '../components/competitionPageURL'
import CompetitionResults from '../components/competitionResults'
import CompetitionResultGraph from '../components/competitionResultGraph'

import db from '../lib/db'
// import { getJudgement, getCompetition } from '../lib/mockCompetitionsDAO'
import { getJudgement, getCompetition } from '../lib/competitionsDAO'


export default function Competitions({ id, title, targets, judgements }) {

  //TODO: CompetitionResults に id を渡して、コンポーネントにデータを取得させる。
  const query = {
    id: id,
    title: title
  }

  return (
    <Layout>
      <CompetitionTitle title={query.title} />
      <CompetitionTargets targets={targets} />

      <Link href={{ pathname: "/judge", query: query }}>
        <button>審査</button>
      </Link>

      <CompetitionResults judgements={judgements}/>
      <CompetitionResultGraph />
      <CompetitionPageURL competitionID={id}/>
      
      <Link href='/'>
        <button>戻る</button>
      </Link>
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
      title: context.query.title,
      targets: competition.targets,
      judgements: judgements
    }
  }
}