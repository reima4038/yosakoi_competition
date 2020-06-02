import { useState } from 'react'
import Rating from '@material-ui/lab/Rating';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import YouTubeEmbedVideo from './youtubeEmbedVideo'

// 評価対象の演舞
export default function competitionMovie(props) {
  const smile = 'smile' + props.videoID;
  const heat = 'heat' + props.videoID;
  const oneness = 'oneness' + props.videoID;
  const groupDancing = 'groupDancing' + props.videoID;
  const tech = 'tech' + props.videoID;
  const structure = 'structure' + props.videoID;
  const [rate, setRate] = useState({[smile]: 2, [heat]: 2})
  
  return (
    <div>
      <YouTubeEmbedVideo videoId={props.videoID} />
      <h3>審査項目</h3>
      <ul>
        <li key={smile}>笑顔：
          <Rating
            name={smile} value={rate[smile]}
            onChange={(event, newValue) => {
              setRate(Object.assign(rate, {[smile]: newValue}))
            }}
          />
        </li>
        <li key={heat}>熱量：
          <Rating
            name={heat} value={rate[heat]}
            onChange={(event, newValue) => {
              setRate(Object.assign(rate, {[heat]: newValue}))
            }}
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