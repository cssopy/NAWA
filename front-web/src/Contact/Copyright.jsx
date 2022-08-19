import React from "react";
import Styles from '../css/contact.module.css';
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
          <Stack direction="row" justifyContent="flex-end" spacing={1}>
          <a className={Styles.link} href="https://www.freepik.com/photos/man-calling">Man calling photo </a>
          </Stack>
      </div>
    </Stack>
  )
}

export default copyright