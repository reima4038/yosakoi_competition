import CompetitionTargetNumbers from '../components/competitionTargetsNumbers'
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
export default function competitionMovies({ targets, ratingHandler,
  judgerHandler, commentHandler, register, errors }) {
  const classes = useStyles();

  const competitionMovie = (videoID, title) => {
    const smile = 'smile_' + videoID;
    const heat = 'heat_' + videoID;
    const oneness = 'oneness_' + videoID;
    const comment = 'comment_' + videoID;

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
          <RatingItem uniqueKey={smile} label='笑顔' onChange={ratingHandler} />
          <RatingItem uniqueKey={heat} label='熱量' onChange={ratingHandler} />
          <RatingItem uniqueKey={oneness} label='一体感' onChange={ratingHandler} />
        </List>
        <TextField
          id={comment}
          name={comment}
          label="コメント（140字まで）"
          multiline
          rows={4}
          onChange={commentHandler}
          variant="outlined"
          fullWidth
        />
      </Paper>
    )
  }

  const movieTags = [];
  targets.map((target) => competitionMovie(target.videoID, target.title))
    .forEach(tag => movieTags.push(tag));

  return (
    <Box>
      <Paper className={classes.moviesNumber}>
        <CompetitionTargetNumbers numbers={movieTags.length}/>
      </Paper>
      {movieTags}
      <Paper className={classes.root}>
        <TextField id="judgerName" name="judgerName" label="審査員名"
          variant="outlined" onChange={(e) => judgerHandler(e)}
          inputRef={register({required: '審査員名は必須入力です。'})}
          error={Boolean(errors['judgerName'])}
          helperText={errors['judgerName']?.message}
        />
      </Paper>
    </Box>
  );
}

