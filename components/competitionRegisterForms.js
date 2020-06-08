import { useState } from 'react'
import Router from 'next/router'
import { TextField } from '@material-ui/core'
import db from '../lib/db' 
import { holdCompetition } from '../lib/competitionsDAO' 

export default function CompetitionRegisterForms() {
  const COMPETITION_TITLE_ID = 'competitionTitle';
  const TARGET_FORM_ID = 'targetForm';
  const TARGET_TITLE_SUFFIX = '_title';
  const TARGET_VIDEOID_SUFFIX = '_videoID';
  const TARGET_MAX_NUMBER = 5;
  const [state, setState] = useState({});
  
  //TODO: もうちょい精度高めたい。NGケース：list以降を持たない文字列。
  const videoIDOf = (youtubeUrl) => {
    return youtubeUrl.replace(/https:.*\/watch\?v=(.*)&list.*/g, "$1");
  }

  const handleChange = (event) => {
    if (event.target.id === COMPETITION_TITLE_ID) {
      setState(Object.assign(state, {[COMPETITION_TITLE_ID]: event.target.value}));
    } else if (event.target.id.match(TARGET_TITLE_SUFFIX)){
      setState(Object.assign(state, {
        [event.target.id]: videoIDOf(event.target.value)
      }));
    } else if (event.target.id.match(TARGET_VIDEOID_SUFFIX)) {
      setState(Object.assign(state, {
        [event.target.id]: event.target.value
      }));
    }
  }

  const targetOf = (title, videoID) => {
    return {title: title, videoID: videoID};
  }
  const dataOf = (state) => {
    const targets = [];
    for (let i = 0; i < TARGET_MAX_NUMBER; i++) {
      const title = state[TARGET_FORM_ID + i + TARGET_TITLE_SUFFIX];
      const videoID = state[TARGET_FORM_ID + i + TARGET_VIDEOID_SUFFIX];
      if (title !== undefined && videoID !== undefined ) {
        targets.push(targetOf(title, videoID));
      }
    }
    return {
      title: state[COMPETITION_TITLE_ID],
      targets: targets
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(dataOf(state));
    holdCompetition(db, dataOf(state));
    Router.push('/registered')
  }
  
  const textFields = () => {
    const textFields = [];
    const offset = 1;
    for (let i = 0; i < TARGET_MAX_NUMBER; i++) {
      const key = `${TARGET_FORM_ID}${i}`;
      const urlFieldId = `${TARGET_FORM_ID}${i}`;
      const label =  `審査演舞${i + offset}`;
      textFields.push(
        <li key={key}>
          <TextField id={urlFieldId + TARGET_TITLE_SUFFIX} label={label + 'タイトル'} variant="outlined" size='small' onChange={handleChange} />
          <TextField id={urlFieldId + TARGET_VIDEOID_SUFFIX} label={'YouTube動画URL'} variant="outlined" size='small' onChange={handleChange} />
        </li>
      )
    }
    return textFields;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>審査会の準備</h1>
      <TextField id={COMPETITION_TITLE_ID}
        label="審査タイトル(30文字まで)"
        variant="outlined"
        onChange={handleChange}
        size='small'
        fullWidth />
      <h2>審査対象演舞</h2>
      <p>YouTubeの動画URLを指定してください。（5個まで）</p>
      <ur>
        {textFields()}
      </ur>
      <input type="submit" value="作成" />
    </form>
  );
}
