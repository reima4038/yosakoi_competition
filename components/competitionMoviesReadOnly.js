import CompetitionTargetNumbers from './competitionTargetsNumbers'
import { 
  Box,
  TextField,
  Paper,
  Typography,
  List,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import YouTubeEmbedVideo from './youtubeEmbedVideo'
import RatingItem from './RatingItem'

const useStyles = makeStyles({
  root: {
    padding: '16px 16px 16px 16px'
  },
  moviesNumber: {
    padding: '0px 16px 0px 16px'
  }
}) 

// 評価対象の演舞リスト
export default function CompetitionMoviesViewOnly({ targets, judgerName }) {
  const classes = useStyles();

  const competitionMovie = (videoID, title, smile, heat, oneness, comment) => {
    const keySmile = 'smile_' + videoID;
    const keyHeat = 'heat_' + videoID;
    const keyOneness = 'oneness_' + videoID;
    const keyComment = 'comment_' + videoID;

    return (
      <Paper className={classes.root}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">
            {title}
          </Box>
        </Typography>
        <YouTubeEmbedVideo videoId={videoID} />
        <Typography variant="h6">審査項目</Typography>
        <List>
          <RatingItem uniqueKey={keySmile} label='笑顔' value={smile} readOnly={true} />
          <RatingItem uniqueKey={keyHeat} label='熱量' value={heat} readOnly={true} />
          <RatingItem uniqueKey={keyOneness} label='一体感' value={oneness} readOnly={true} />
        </List>
        <TextField
          id={keyComment}
          label="コメント（140字まで）"
          multiline
          rows={4}
          value={comment}
          variant="outlined"
          fullWidth
        />
      </Paper>
      )
  }

  const movieTags = [];
  targets?.map((target) => competitionMovie(target.videoID, target.title,
      target.smile, target.heat, target.oneness, target.comment))
    .forEach(tag => movieTags.push(tag));

  return (
    <Box>
      <Paper className={classes.moviesNumber}>
        <CompetitionTargetNumbers numbers={movieTags.length}/>
      </Paper>
      {movieTags}
      <Paper className={classes.root}>
        <TextField id="judgerName" label="審査員名"
          variant="outlined" defaultValue={judgerName} disabled/>
      </Paper>
    </Box>
  );
}

