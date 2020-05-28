import YouTubeEmbedVideo from './youtubeEmbedVideo'

// 評価対象の演舞
export default function competitionMovie(props) {
  return (
    <div>
      <YouTubeEmbedVideo videoId={props.videoId} />
      <h3>審査項目</h3>
      <ul>
        <li>笑顔：☆☆☆☆☆</li>
        <li>熱量：☆☆☆☆☆</li>
        <li>一体感：☆☆☆☆☆</li>
        <li>群舞：☆☆☆☆☆</li>
        <li>技量：☆☆☆☆☆</li>
        <li>構成：☆☆☆☆☆</li>
      </ul>
      <h3>コメント（140字まで）</h3>
      <textarea />
    </div>
  );
}