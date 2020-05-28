// YouTube埋め込み動画

export default function YouTubeEmbedVideo(props) {
  const video_src = "https://www.youtube.com/embed/" + props.videoId
  return (
      <iframe width="560" height="315" src={video_src} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
  )
}