import Link from 'next/link'
import db from '../lib/db'
import { getCompetitions } from '../lib/competitionsDAO'
// import { getCompetitions } from '../lib/mockCompetitionsDAO'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

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
      listTags.push(<ListItem><Link href={
        { 
          pathname: '/competitions',
          query: {
            id: competition.id,
            title: competition.title
          }
        }
      }><a><ListItemText>{competition.title}</ListItemText></a></Link></ListItem>)
    });
    return listTags;
  }

  render() {    
    return (
      <Paper>
        <Typography variant="h6">最新の審査</Typography>
        <List>
          {this.listTags()}
        </List>
      </Paper>
    )
  }
}

export default LatestCompetitions;