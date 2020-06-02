import Link from 'next/link'

import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargets from '../components/competitionTargets'
import CompetitionPageURL from '../components/competitionPageURL'
import CompetitionResults from '../components/competitionResults'
import CompetitionResultGraph from '../components/competitionResultGraph'

export default function Competitions({ id, title }) {

  //TODO: CompetitionResults に id を渡して、コンポーネントにデータを取得させる。
  const query = {
    id: id,
    title: title
  }

  return (
    <Layout>
      <CompetitionTitle title={query.title} />
      <CompetitionTargets competitionID={query.id} />

      <Link href={{ pathname: "/judge", query: query }}>
        <button>審査</button>
      </Link>

      <CompetitionResults />
      <CompetitionResultGraph />
      <CompetitionPageURL competitionID={id}/>
      
      <Link href='/'>
        <button>戻る</button>
      </Link>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id,
      title: context.query.title
    }
  }
}