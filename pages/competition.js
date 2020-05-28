import Link from 'next/link'
import Layout from '../components/layout'
import CompetitionTitle from '../components/competitionTitle'
import CompetitionTargets from '../components/competitionTargets'
import CompetitionPageURL from '../components/competitionPageURL'
import CompetitionResults from '../components/competitionResults'
import CompetitionResultGraph from '../components/competitionResultGraph'

class Competition extends React.Component {

  constructor() {
    super()
    this._mock_movies = this._mock_movies.bind(this)
  }

  _mock_movies() {
    let movies = [
      '演舞動画タイトル1',
      '演舞動画タイトル2',
      '演舞動画タイトル3',
      '演舞動画タイトル4',
      '演舞動画タイトル5',
      '演舞動画タイトル6',
    ];
    return movies
  }

  render() {
    return (
      <Layout>
        <CompetitionTitle title="YOSAKOIソーラン一次審査 審査枠(2)" />
        <CompetitionTargets movies={this._mock_movies()}/>

        <Link href="/judge">
          <button>審査</button>
        </Link>

        <CompetitionResults />
        <CompetitionResultGraph />
        <CompetitionPageURL />
        
        <Link href='/'>
          <button>戻る</button>
        </Link>
      </Layout>
    )  
  }
}

export default Competition;