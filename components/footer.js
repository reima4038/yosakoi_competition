import React from 'react' 
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Paper>
          <Grid container
            direction="column"
            alignItems="center"
            justify="center">
            <Grid item xs={8}>
            (C) BambooShrine - {new Date().getFullYear()}
            </Grid>
          </Grid>
        </Paper>
      </footer>
    )
  }
}

export default Footer