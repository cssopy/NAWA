import React from "react";
import Contact1 from '../Contact/Contact1';
import Contact2 from '../Contact/Contact2';
import Contact3 from '../Contact/Contact3'
import Copyright from '../Contact/Copyright';

function Contact() {
    const styles  = {
        textAlign: 'center',
        fontSize: '30px',
    }

    return (
      <div>
        <Contact1 />
        <Contact2 />
        <div>
            <div id="contact" style={styles}>
                어떤 문의사항이든 다 알려드립니다
            </div>
            <br />
            <Contact3 />
        </div>
        <hr style={{marginBottom: '10px'}} />
        <Copyright />
      </div>
    )
}

export default Contact;