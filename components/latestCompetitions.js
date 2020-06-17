import Link from 'next/link'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
  root: {
    padding: '16px 16px 16px 16px'
  }
})

export default function LatestCompetitions({ competitions }) {
  const classes = useStyle();

  const listTags = (competitions) => {
    let listTags = [];
    competitions.forEach(competition => {
      listTags.push(<ListItem><Link href={
        { 
          pathname: '/competitions',
          query: {
            id: competition.id,
          }
        }
      }><a><ListItemText>{competition.title}</ListItemText></a></Link></ListItem>)
    });
    return listTags;
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h6">最新の審査</Typography>
      <List>
        {listTags(competitions)}
      </List>
    </Paper>
  )
}



