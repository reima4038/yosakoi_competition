import { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import YouTubeEmbedVideo from './youtubeEmbedVideo'

// 評価対象の演舞
export default function competitionMovie(props) {
  const smile = 'smile_' + props.videoID;
  const heat = 'heat_' + props.videoID;
  const oneness = 'oneness_' + props.videoID;
  const groupDancing = 'groupDancing_' + props.videoID;
  const tech = 'tech_' + props.videoID;
  const structure = 'structure_' + props.videoID;
  
  return (
    <div>
      <YouTubeEmbedVideo videoId={props.videoID} />
      <h3>審査項目</h3>
      <ul>
        <li key={smile}>笑顔：
          <Rating
            name={smile} value={props.ratingState[smile]}
            onChange={props.onChange}
          />
        </li>
        <li key={heat}>熱量：
          <Rating
            name={heat} value={props.ratingState[heat]}
            onChange={props.onChange}
          />
        </li>
        <li key={oneness}>一体感：☆☆☆☆☆</li>
        <li key={groupDancing}>群舞：☆☆☆☆☆</li>
        <li key={tech}>技量：☆☆☆☆☆</li>
        <li key={structure}>構成：☆☆☆☆☆</li>
      </ul>
      <h3>コメント（140字まで）</h3>
      <TextareaAutosize aria-label="comments" rowsMin={3} placeholder="感想をお書きください。" />
    </div>
  );
}