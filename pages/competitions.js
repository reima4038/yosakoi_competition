import Link from 'next/link'

import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargets from '../components/competitionTargets'
import CompetitionPageURL from '../components/competitionPageURL'
import CompetitionResults from '../components/competitionResults'
import CompetitionResultGraph from '../components/competitionResultGraph'

import db from '../lib/db'
// import { getJudgement } from '../lib/mockCompetitionsDAO'
import { getJudgement } from '../lib/competitionsDAO'


export default function Competitions({ id, title, judgements }) {

  // FIXME: デバッグ終わったら消す。
  console.log('judgements are ...');
  console.log(JSON.stringify(judgements, null, '\t'));

  //TODO: CompetitionResults に id を渡して、コンポーネントにデータを取得させる。
  const query = {
    id: id,
    title: title
  }

  //TODO: CompetitionTargetsからDB呼び出しをPage側に持ってくる
  return (
    <Layout>
      <CompetitionTitle title={query.title} />
      <CompetitionTargets competitionID={query.id} />

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
  const judgements = await getJudgement(db, competitionID);

  return {
    props: {
      id: competitionID,
      title: context.query.title,
      judgements: judgements
    }
  }
}