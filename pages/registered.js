import Link from 'next/link'

import db from '../lib/db'
import {holdCompetition} from '../lib/competitionsDAO'
// import {holdCompetition} from '../lib/mockCompetitionsDAO'
import Layout from '../components/layout'
import CompetitionPageURL from '../components/competitionPageURL'


class Registered extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      competitionID: ''
    }
  }

  componentDidMount() {
    // holdCompetition(db, 'YOSAKOIソーラン一次審査 審査枠(2)')
    //   .then(ref => {
    //     this.setState({competitionID: ref.id})
    //   });
  }

  render() {
    if (!this.state.competitionID) {
      return (
          <Layout>
            <h2>審査ページの作成中です。</h2>
            <p>しばらくお待ちください...</p>
          </Layout>
        );
    } else {
      return (
          <Layout>
            <h2>審査ページの作成が完了しました。</h2>
            <p>下記のURLを共有して審査を始めましょう。</p>
            <CompetitionPageURL competitionID={this.state.competitionID} />
            <Link href='/competition'><a>審査ページへ</a></Link>
          </Layout>
        );
    }
  }
}

export default Registered;