import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '300px',
  }
})
// YouTube埋め込み動画
export default function YouTubeEmbedVideo(props) {
  const classes = useStyles();

  const video_src = "https://www.youtube.com/embed/" + props.videoId
  return (
    <Container maxWidth="sm">
      <iframe className={classes.root} src={video_src} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </Container>  )
}