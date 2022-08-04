import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Contact3 () {
  const [ values, setValues ] = useState({
    name: '',
    email: '',
    message: '',
    imageUrl: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const imgChange = (event) => {
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = (e) => {
      // image가 담기지 않는다 방법을 모르곘다..... 분명히 file에는 
      setValues({ ...values, 'imageUrl': reader.result});
      console.log(values)
    }
    if(file)
      reader.readAsDataURL(file);
  }

  const sendRequest = (event) => {
    event.preventDefault();
    console.log(values)
    alert('문의사항이 전송되었습니다')
    setValues({
      name: '',
      email: '',
      message: '',
      imageUrl: '',
    })
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const prevStyle = {
    width: '100px',
    height: '100px',
  }

  return (
    <div style={style}>
      <form onSubmit={sendRequest}>
        <Stack direction="row" spacing={2}>
          <TextField
            id="outlined-name-flexible"
            label="name"
            name="name"
            required
            multiline
            value={values.name}
            onChange={handleChange}
            style= {{
                width: '40%'
            }}
          />
          <TextField
            id="outlined-email-flexible"
            label="email"
            name="email"
            required
            multiline
            value={values.email}
            onChange={handleChange}
            style= {{
                width: '60%',
            }}
          />
        </Stack>
        <br />
        <TextField
            id="outlined-message-flexible"
            label="message"
            name="message"
            multiline
            rows={8}
            fullWidth
            value={values.message}
            onChange={handleChange}
            style={{
              marginBottom: '20px'
            }}
        />

        {/* 추가 고려 사항: 이미지 불러오기, 이메일 전송 */}
        <Stack
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          <div>{values.imageUrl && <img style={prevStyle} src={values.imageUrl} alt="preview-img" />}</div>
          <Button variant="contained" component="label" color="success">
            사진등록
            <input
              label="image"
              name="image"
              hidden
              accept="image/*"
              type="file"
              onChange={imgChange}
            />
          </Button>
          <Button variant="contained" type="submit">전송</Button>
        </Stack>
      </form>
    </div>
  )
}

export default Contact3