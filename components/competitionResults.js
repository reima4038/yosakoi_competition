import Link from 'next/link';
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

// 審査結果
export default function competitonResults({ judgements }) {

  const href = (id, title, judgerName) => {
    return ({
      pathname: '/result',
      query: { id: id, title: title, judgerName: judgerName }
    })
  };

  const offset = 1;
  const tags = []
  judgements.forEach((judgement, i) => {
    tags.push(
      <ListItem>
        <Link href={href(judgement.competitionID,
          judgement.title,
          judgement.judgerName)}>
          <a>
            <ListItemText>
              #{i + offset} {judgement.judgerName}
            </ListItemText>
          </a>
        </Link>
      </ListItem>
    )
  })

  return (
    <Box>
      <Typography variant="h6">審査結果</Typography>
      <List>
        {tags}
      </List>
    </Box>
  );
}