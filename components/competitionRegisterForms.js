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
  const [state, setState] = useState({});
  
  //TODO: もうちょい精度高めたい。NGケース：list以降を持たない文字列。
  const videoIDOf = (youtubeUrl) => {
    return youtubeUrl.replace(/https:.*\/watch\?v=(.*)&list.*/g, "$1");
  }

  const titleOf = (youtubeUrl) => {
    // TODO: Youtubeのタイトルを取得する。こんなんでYoutubeDataAPIのリクエスト使う？
    return youtubeUrl;
  }

  const handleChange = (event) => {
    if (event.target.id == COMPETITION_TITLE_ID) {
      setState(Object.assign(state, {[COMPETITION_TITLE_ID]: event.target.value}));
    } else {
      setState(Object.assign(state, {
        [event.target.id + TARGET_TITLE_SUFFIX]: videoIDOf(event.target.value),
        [event.target.id + TARGET_VIDEOID_SUFFIX]: titleOf(event.target.value)
      }));
    }
  }

  const targetOf = (title, videoID) => {
    return {title: title, videoID: videoID};
  }
  const dataOf = (state) => {
    const targets = [];
    for (let i = 1; i < 6; i++) {
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
        <li key='targetForm1'><TextField id="targetForm1" label="審査演舞1" variant="outlined" size='small' onChange={handleChange} /></li>
        <li key='targetForm2'><TextField id="targetForm2" label="審査演舞2" variant="outlined" size='small' onChange={handleChange} /></li>
        <li key='targetForm3'><TextField id="targetForm3" label="審査演舞3" variant="outlined" size='small' onChange={handleChange} /></li>
        <li key='targetForm4'><TextField id="targetForm4" label="審査演舞4" variant="outlined" size='small' onChange={handleChange} /></li>
        <li key='targetForm5'><TextField id="targetForm5" label="審査演舞5" variant="outlined" size='small' onChange={handleChange} /></li>
      </ur>
      <input type="submit" value="作成" />
    </form>
  );
}
