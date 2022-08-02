import React from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function Contact3 () {
  const [values, setValues ] = React.useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const sendRequest = () => {
    console.log(values.name, values.email, values.message)
  }

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  return (
    <div style={style}>
      <form onSubmit={sendRequest}>
        <Stack direction="row" spacing={2}>
          <TextField
            id="outlined-name-flexible"
            label="name"
            required
            multiline
            value={values.name}
            onChange={handleChange('name')}
            style= {{
                width: '40%'
            }}
          />
          <TextField
            id="outlined-email-flexible"
            label="email"
            required
            multiline
            value={values.email}
            onChange={handleChange('email')}
            style= {{
                width: '60%'
            }}
          />
        </Stack>
        <br />
        <TextField
            id="outlined-message-flexible"
            label="message"
            multiline
            rows={8}
            fullWidth
            value={values.message}
            onChange={handleChange('message')}
        />
        <div
            style={{
                display: 'flex',
                justifyContent: 'end',
                padding: '10px 0',
            }}
          >
          <Button variant="contained" type="submit">전송</Button>
        </div>
      </form>
    </div>
  )
}

export default Contact3