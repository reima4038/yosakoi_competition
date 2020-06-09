import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField } from '@material-ui/core' 
import { useRouter } from 'next/router'

export default function ValidationTest() {
  const { register, handleSubmit, errors } = useForm();
  const router = useRouter();
  const onSubmit = data => {
    console.log(`send data: ${data.title}`);
    router.push({pathname: '/'})
  }
  
  return (
    <>
      <h1>バリデーションテスト</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          label="タイトル(必須)"
          type="text"
          name="title"
          fullWidth
          margin="normal"
          inputRef={register({required: '必須入力です。', maxLength: {value: 10, message:'１０文字以内で入力して下さい。'}})}
          error={Boolean(errors.title)}
          helperText={errors?.title?.message}
        />
        <input type="submit" />
      </form>
    </>
  );
}