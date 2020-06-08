import Link from 'next/link'
import Layout from '../components/layout'
import CompetitionPageURL from '../components/competitionPageURL'

export default function Registered ({ id, title }) {
  return (
    <Layout>
      <h2>審査ページの作成が完了しました。</h2>
      <p>下記のURLを共有して審査を始めましょう。</p>
      <CompetitionPageURL competitionID={ id } />
      <Link href={{ 
        pathname: '/competitions',
        query: {
          id: id,
          title: title
        }
      }}><a>審査ページへ</a></Link>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.query.id
    }
  }
}
