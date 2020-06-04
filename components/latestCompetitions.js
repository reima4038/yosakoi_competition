import Link from 'next/link'
import db from '../lib/db'
import { getCompetitions } from '../lib/competitionsDAO'
// import { getCompetitions } from '../lib/mockCompetitionsDAO'

class LatestCompetitions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      competitions: []
    }
    this.listTags = this.listTags.bind(this)
  }

  componentDidMount() {
    getCompetitions(db).then(refs => {
      let competitions = [];
      refs.forEach(ref => {
        competitions.push({
          id: ref.id,
          title: ref.title
        })
      });
      this.setState({
        competitions: competitions
      })
    });
  }

  listTags() {
    let listTags = [];
    this.state.competitions.forEach(competition => {
      listTags.push(<li><Link href={
        { 
          pathname: '/competitions',
          query: {
            id: competition.id,
            title: competition.title
          }
        }
      }><a>{competition.title}</a></Link></li>)
    });
    return listTags;
  }

  render() {    
    return (
      <React.Fragment>
        <h3>最新の審査</h3>
        <ul>
          {this.listTags()}
        </ul>
      </React.Fragment>
    )
  }
}

export default LatestCompetitions;