import React from "react";
import Container from '@mui/material/Container';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import Stack from '@mui/material/Stack';

function Contact2 () {
    const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '100px'
        }
    return (
        <Container
            style={styles}
        >
            <Stack direction="row" spacing={4}>
                <div>
                <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2710.536584316709!2d128.41438574964118!3d36.10836682951807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565c411a3679bff%3A0xcbc6da470b1a0bbd!2z7IK87ISx7KCE7J6QIOq1rOuvuDLsgqzsl4XsnqU!5e0!3m2!1sko!2skr!4v1659007064293!5m2!1sko!2skr" 
                width="400" height="300" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <div>
                        <div>
                            <CorporateFareIcon></CorporateFareIcon> address:
                        </div>
                        <div>경상북도 구미시</div>
                        <div>3공단 3로 302 창의동 대강의장</div>
                        <div>D205 Team 심플팀플</div>
                    </div>
                </div>
            </Stack>
        </Container>
    )
}

export default Contact2