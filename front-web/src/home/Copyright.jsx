import React from "react";
import Styles from "../css/web.module.css";
import { Stack } from "@mui/material";

function copyright () {
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
      <div className={Styles.copyright}>
        <div className={Styles.linktitle}>
          <span>copyright</span>
        </div>
        <Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <a className={Styles.link} href="https://vidfy.com/video/young-hipster-couple-enjoying-cycling-through-park-on-trekking-bikes-2">Couple bike</a>
            <a className={Styles.link} href='https://www.freepik.com/photos/fit-couple'>Fit couple photo</a>
            <a className={Styles.link} href='https://www.freepik.com/vectors/online-background'>Online background vector</a>
            <a className={Styles.link} href='https://www.freepik.com/photos/gymnastics'>Gymnastics</a>
            <a className={Styles.link} href='https://www.freepik.com/photos/happy-phone'>Happy phone</a>
          </Stack>
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
            <a className={Styles.link} href='https://www.freepik.com/photos/burpee'>Burpee</a>
            <a className={Styles.link} href='https://www.freepik.com/photos/dog-walking'>Dog walkin </a>
            <a className={Styles.link} href='https://www.freepik.com/photos/gym-coach'>Gym coach</a>
            {/* <a className={Styles.link} href="https://vidfy.com/video/close-up-of-two-caucasian-basketball-players-stretching-their-ankles-in-an-outdoor-baskeball-court">Baseketball players</a> */}
            {/* <a href="https://www.freepik.com/photos/gym-coach">Gym coach</a> */}
          </Stack>
        </Stack>
      </div>
    </Stack>
  )
}

export default copyright