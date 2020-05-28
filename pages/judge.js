import Link from 'next/link'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargetNumbers from '../components/competitionTargetsNumbers'
import CompetitionMovies from '../components/CompetitionMovies'

export default function Judge(props) {
  return (
    <Layout>
      <CompetitionTitle title="YOSAKOIソーラン一次審査 審査枠(2)" />
      <CompetitionTargetNumbers numbers="4"/>
      <CompetitionMovies />
      <Link href="/competition">
        <button>戻る</button>
      </Link>
      <Link href="/competition">
        <button>登録</button>
      </Link>
    </Layout>
  )
}

// export async function getServerSideProps() {
//   // Fetch data from external API
//   const res = await fetch(`http://localhost:3000/api/hello`)
//   const data = await res.json()

//   // Pass data to the page via props
//   return { props: { data } }
// }

