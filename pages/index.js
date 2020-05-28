import Layout from '../components/layout'
import CompetitionRegisterForms from '../components/competitionRegisterForms'
import LatestCompetitions from '../components/latestCompetitions'

export default function Top() {
  return (
    <Layout>
      <CompetitionRegisterForms/>
      <hr />
      <LatestCompetitions />
    </Layout>
  )
}