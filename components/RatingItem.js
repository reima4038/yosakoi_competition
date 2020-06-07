import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

export default function RatingItem(props) {
  const defaultValue = 2;
  const [value, setValue] = useState(props.value == undefined ? defaultValue : props.value)
  
  if (props.readOnly == true) {
    return (
      <li key={props.uniqueKey}>{props.label}：
        <Rating name={props.uniqueKey} value={value} readOnly />
      </li>
    )
  } else {
    return (
      <li key={props.uniqueKey}>{props.label}：
        <Rating
          name={props.uniqueKey} value={value}
          onChange={(event) => {
            props.onChange(event);
            setValue(event.target.value);
          }}
        />
      </li>
    )
  }


}