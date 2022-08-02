import * as React from 'react';
import Intro1 from '../Intro/Intro1'
import Intro2 from '../Intro/Intro2'
import Intro3 from '../Intro/Intro3'
import Copyright from '../Intro/Copyright'

function Intro() {
  return (
    <div>
      <Intro1></Intro1>
      <div
        style={{
          fontSize: '50px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        Introduce CoDevolopers
      </div>
      <Intro2></Intro2>
      <div
        style={{
          fontSize: '50px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '50px',
        }}
      >
        Tech & Stack
      </div>
      <Intro3></Intro3>
      <hr style={{marginBottom: '10px'}} />
      <Copyright />
    </div>
  )
}

export default Intro;