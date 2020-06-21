import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Router from 'next/router'
import { TextField, Box } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

import db from '../lib/db' 
import { holdCompetition } from '../lib/competitionsDAO' 

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '16px 16px 16px 16px'
  },
}));

export default function CompetitionRegisterForms() {
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm();

  const COMPETITION_TITLE_ID = 'competitionTitle';
  const TARGET_FORM_ID = 'targetForm';
  const TARGET_TITLE_SUFFIX = '_title';
  const TARGET_VIDEOID_SUFFIX = '_videoID';
  const TARGET_MAX_NUMBER = 5;
  const [state, setState] = useState({});
  
  const videoIDOf = (youtubeUrl) => {
    return youtubeUrl.replace(/&list.*/g, '')
      .replace(/https:.*\/watch\?v=(.*)/g, "$1")
      .replace(/https:\/\/youtu.be\//g, '');
  }

  const handleChange = (event) => {
    if (event.target.id === COMPETITION_TITLE_ID) {
      setState(Object.assign(state, {[COMPETITION_TITLE_ID]: event.target.value}));
    } else if (event.target.id.match(TARGET_VIDEOID_SUFFIX)){
      setState(Object.assign(state, {
        [event.target.id]: videoIDOf(event.target.value)
      }));
    } else if (event.target.id.match(TARGET_TITLE_SUFFIX)) {
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
      } else if (title == undefined && videoID !== undefined ) {
        targets.push(targetOf(videoID, videoID));
      }
    }
    return {
      title: state[COMPETITION_TITLE_ID],
      targets: targets
    }
  }

  const onSubmit = () => {
    holdCompetition(db, dataOf(state))
      .then(ref => {
        Router.push({ pathname: "/registered", query:
          { 
            id: ref.id,
            title: state[COMPETITION_TITLE_ID]
          }
        })
      });
  }
  
  const textFields = () => {
    const textFields = [];
    const offset = 1;

    // 必須入力項目
    textFields.push(
      <ListItem key={TARGET_FORM_ID + 0}>
        <div>
          <ListItemText primary="審査演舞1"/>
          <div>
            <TextField id={TARGET_FORM_ID + 0 + TARGET_TITLE_SUFFIX} name={TARGET_FORM_ID + 0 + TARGET_TITLE_SUFFIX}
              label={'タイトル'} variant="outlined" size='small' onChange={handleChange}
              inputRef={register}
            />
            <TextField id={TARGET_FORM_ID + 0 + TARGET_VIDEOID_SUFFIX} name={TARGET_FORM_ID + 0 + TARGET_VIDEOID_SUFFIX}
              label={'YouTube動画URL'} variant="outlined" size='small' onChange={handleChange}
              inputRef={register({required: '審査対象の演舞動画は最低一つ登録してください。'})}
              error={Boolean(errors[TARGET_FORM_ID + 0 + TARGET_VIDEOID_SUFFIX])}
              helperText={errors[TARGET_FORM_ID + 0 + TARGET_VIDEOID_SUFFIX]?.message}
            />
          </div>
        </div>
      </ListItem>
    )
    
    // 非必須入力項目
    for (let i = 1; i < TARGET_MAX_NUMBER; i++) {
      const key = `${TARGET_FORM_ID}${i}`;
      const urlFieldId = `${TARGET_FORM_ID}${i}`;
      const label = `審査演舞${i + offset}`;
      textFields.push(
        <ListItem key={key}>
          <div>
            <ListItemText>{label}</ListItemText>
            <div>
              <TextField id={urlFieldId + TARGET_TITLE_SUFFIX} name={urlFieldId + TARGET_TITLE_SUFFIX}
                label={'タイトル'} variant="outlined" size='small' onChange={handleChange}
                inputRef={register}
              />
              <TextField id={urlFieldId + TARGET_VIDEOID_SUFFIX} name={urlFieldId + TARGET_VIDEOID_SUFFIX}
                label={'YouTube動画URL'} variant="outlined" size='small' onChange={handleChange}
                inputRef={register}
              />
            </div>
          </div>
        </ListItem>
      )
    }
    return textFields;
  }

  return (
    <Paper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.root}>
          <Typography variant="h5">審査会の準備</Typography>
          <TextField id={COMPETITION_TITLE_ID}
            name={COMPETITION_TITLE_ID}
            label="審査タイトル(30文字まで)"
            type="text"
            variant="outlined"
            onChange={handleChange}
            size='small'
            fullWidth
            inputRef={register({required: '審査タイトルは必須入力です。', maxLength: {value: 30, message:'審査タイトルは30文字以内として下さい。'}})}
            error={Boolean(errors[COMPETITION_TITLE_ID])}
            helperText={errors[COMPETITION_TITLE_ID]?.message}
          />
        </Box>
        <Box className={classes.root}>
          <Typography variant="h6">審査対象を選ぶ</Typography>
          <Typography variant="body2">YouTubeの動画URLを最低１つ指定してください。タイトルは未入力の場合、動画のIDがタイトルになります。</Typography>
          <List>
            {textFields()}
          </List>
          <Box textAlign="center">
            <Button variant="contained" type="submit" color="primary">審査会を作成する</Button>
          </Box>
        </Box>
      </form>
    </Paper>
  );
}
