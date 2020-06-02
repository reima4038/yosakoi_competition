import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionMovies from '../components/CompetitionMovies'

export default function Judge({id, title}) {
  const router = useRouter();
  const query = {
    id: id,
    title: title
  }
  const href = { pathname: '/competitions', query: query }
  const handleClick = (e) => {
    router.push(href)
  }

  return (
    <Layout>
      <CompetitionTitle title={title} />
      <CompetitionMovies competitionID={id} />
      <Link href={href}>
        <button>戻る</button>
      </Link>
      <button onClick={handleClick}>登録</button>
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