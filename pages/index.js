import Layout from '../components/layout'
import CompetitionRegisterForms from '../components/competitionRegisterForms'
import LatestCompetitions from '../components/latestCompetitions'
import db from '../lib/db'
import { getCompetitions } from '../lib/competitionsDAO'
// import { getCompetitions } from '../lib/mockCompetitionsDAO'

export default function TopPage({ competitions }) {

  return (
    <Layout>
      <CompetitionRegisterForms />
      <LatestCompetitions competitions={competitions}/>
    </Layout>
  )
}
export async function getServerSideProps(context) {
  const competitions = await getCompetitions(db);
  return {
    props: {
      competitions: competitions
    }
  }
}