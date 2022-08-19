import React from "react";
import Styles from "../css/web.module.css";
import { Grid, Stack } from "@mui/material";

function copyright () {

  const data = [
    {
      name: 'Couple bike',
      href: "https://vidfy.com/video/young-hipster-couple-enjoying-cycling-through-park-on-trekking-bikes-2"
    },
    {
      name: 'Fit couple photo',
      href: 'https://www.freepik.com/photos/fit-couple'
    },
    {
      name: 'Online background vector',
      href: 'https://www.freepik.com/vectors/online-background'
    },
    {
      name: 'Gymnastics',
      href: 'https://www.freepik.com/photos/gymnastics'
    },
    {
      name: 'Happy phone',
      href: 'https://www.freepik.com/photos/happy-phone'
    },
    {
      name: 'Burpee',
      href: 'https://www.freepik.com/photos/burpee'
    },
    {
      name: 'Dog walkin',
      href: 'https://www.freepik.com/photos/dog-walking'
    },
    {
      name: 'Gym coach',
      href: 'https://www.freepik.com/photos/gym-coach'
    },
  ]

  return (
    <Stack direction="row" justifyContent="space-between" style={{margin: '0 2rem'}}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        @copyright by 심플팀플
      </div>
      <Stack className={Styles.copyright}>
        <div style={{ textAlign: 'end' }}>
          <span>copyright</span>
        </div>
        <Grid container spacing={1}>
          { data.map((copy) => (
            <Grid item xs={3} style={{width: '50px', height:'10px'}}>
              <a className={Styles.link} href={copy.href} target="_blank" rel="noreferrer">{copy.name}</a>
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Stack>
  )
}

export default copyright