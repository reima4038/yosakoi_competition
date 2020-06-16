import {
  Box,
  Typography
} from '@material-ui/core'

// 演舞数
export default function competitionTargetsNumbers(props) {
  return (
    <Box>
      <Typography variant="subtitle1">
        演舞数：{props.numbers}
      </Typography>
    </Box>
  )
}