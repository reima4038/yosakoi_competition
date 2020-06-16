import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// 審査対象
export default function competitionTargets({ targets }) {

  const tags = [];
  const baseurl = 'https://www.youtube.com/watch?v=';
  targets?.forEach(target => {
    tags.push(
      <ListItem key={target.videoID}>
        <a href={baseurl + target.videoID}>
          <ListItemText>{target.title}</ListItemText>
        </a>
      </ListItem>)
  });

  return (
    <div>
        <Typography variant="h6">審査対象</Typography>
        <List>
          {tags}
        </List>
    </div>
  )
}