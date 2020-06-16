import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import { 
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
  }
})

export default function RatingItem(props) {
  const classes = useStyles();

  const defaultValue = 2;
  const [value, setValue] = useState(props.value == undefined ? defaultValue : props.value)
  
  if (props.readOnly == true) {
    return (
      <ListItem key={props.uniqueKey}>
        <ListItemText>
          <Typography className={classes.root} variant="subtitle1" component="span">{props.label}：</Typography>
          <Rating name={props.uniqueKey} value={value} readOnly />
        </ListItemText>
      </ListItem>
    )
  } else {
    return (
      <ListItem key={props.uniqueKey}>
        <ListItemText>
          <Typography variant="subtitle1" component="span">{props.label}：</Typography>
          <Rating
            className={classes.root}
            name={props.uniqueKey} value={value}
            onChange={(event) => {
              props.onChange(event);
              setValue(event.target.value);
            }}/>
        </ListItemText>
      </ListItem>
    )
  }


}