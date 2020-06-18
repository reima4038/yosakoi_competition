import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    color: 'inherit',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
});

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <Typography variant="h6" className={classes.root}>
            みんなでよさこい審査員（仮）
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
}