import CompetitionTargetNumbers from './competitionTargetsNumbers'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TextField } from '@material-ui/core'
import YouTubeEmbedVideo from './youtubeEmbedVideo'
import RatingItem from './RatingItem'

// 評価対象の演舞リスト
export default function CompetitionMoviesViewOnly({ targets, judgerName }) {

  const competitionMovie = (videoID, title, smile, heat, oneness, comment) => {
    const keySmile = 'smile_' + videoID;
    const keyHeat = 'heat_' + videoID;
    const keyOneness = 'oneness_' + videoID;
    const keyComment = 'comment_' + videoID;

    return (
      <React.Fragment key={videoID}>
        <h3>{title}</h3>
        <YouTubeEmbedVideo videoId={videoID} />
        <h3>審査項目</h3>
        <ul>
          <RatingItem uniqueKey={keySmile} label='笑顔' value={smile} readOnly={true} />
          <RatingItem uniqueKey={keyHeat} label='熱量' value={heat} readOnly={true} />
          <RatingItem uniqueKey={keyOneness} label='一体感' value={oneness} readOnly={true} />
        </ul>
        <TextField
          id={keyComment}
          label="コメント（140字まで）"
          multiline
          rows={4}
          value={comment}
          variant="outlined"
        />
        <hr />
      </React.Fragment>
      )
  }

  const movieTags = [];
  targets?.map((target) => competitionMovie(target.videoID, target.title,
      target.smile, target.heat, target.oneness, target.comment))
    .forEach(tag => movieTags.push(tag));

  return (
    <div>
      <CompetitionTargetNumbers numbers={movieTags.length}/>
      {movieTags}
      <TextField id="judgerName" label="審査員名"
        variant="outlined" defaultValue={judgerName} disabled/>
    </div>
  );
}

