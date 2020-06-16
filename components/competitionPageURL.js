import Box from '@material-ui/core/Box'
import { TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

// 審査ページURLのコンポーネント

export default function CompetitionPageURL(props) {
  const baseUrl = 'http://competitions/';
  const competitionPageURL = 'competitionPageURL';
  return(
    <Box>
      <Typography variant="h6">
        <Box fontWeight="fontWeightBold">審査ページ共有用URL</Box>
      </Typography>
      <TextField 
        id={competitionPageURL}
        name={competitionPageURL}
        type="text"
        value={baseUrl + props.competitionID}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}