import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

export default function competitionTitle(props) {
  return ( 
    <Typography component="div" variant="h5">
      <Box fontWeight="fontWeightBold">{props.title}</Box>
    </Typography>
  )
}