import { useState } from 'react';
import Rating from '@material-ui/lab/Rating';

export default function RatingItem(props) {
  const [value, setValue] = useState(2)
  
  return (
    <li key={props.uniqueKey}>{props.label}：
      <Rating
        name={props.uniqueKey} value={value}
        onChange={(event, newValue) => {
          props.onChange(event, newValue);
          setValue(newValue);
        }}
      />
    </li>
  )
}