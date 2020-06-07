import CompetitionTargetNumbers from '../components/competitionTargetsNumbers'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core'
import YouTubeEmbedVideo from './youtubeEmbedVideo'
import RatingItem from './RatingItem'

// 評価対象の演舞リスト
export default function competitionMovies({ targets, ratingHandler, judgerHandler, commentHandler }) {

  const competitionMovie = (videoID, title) => {
    const smile = 'smile_' + videoID;
    const heat = 'heat_' + videoID;
    const oneness = 'oneness_' + videoID;
    const comment = 'comment_' + videoID;

    return (
      <React.Fragment key={videoID}>
        <h3>{title}</h3>
        <YouTubeEmbedVideo videoId={videoID} />
        <h3>審査項目</h3>
        <ul>
          <RatingItem uniqueKey={smile} label='笑顔' onChange={ratingHandler} />
          <RatingItem uniqueKey={heat} label='熱量' onChange={ratingHandler} />
          <RatingItem uniqueKey={oneness} label='一体感' onChange={ratingHandler} />
        </ul>
        <TextField
          id={comment}
          name={comment}
          label="コメント（140字まで）"
          multiline
          rows={4}
          onChange={commentHandler}
          variant="outlined"
        />
        <hr />
      </React.Fragment>
      )
  }

  const movieTags = [];
  targets.map((target) => competitionMovie(target.videoID, target.title))
    .forEach(tag => movieTags.push(tag));

  return (
    <div>
      <CompetitionTargetNumbers numbers={movieTags.length}/>
      {movieTags}
      <TextField id="judgerName" label="審査員名"
        variant="outlined" onChange={(e) => judgerHandler(e)}/>
    </div>
  );
}

