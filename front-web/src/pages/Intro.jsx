import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

function Intro() {
    const coDevelopers = [
        {
            name: '이정재',
            part: 'A',
            image: '',
        },
        {
            name: '김주원',
            part: 'B',
            image: '',
        },
        {
            name: '임진현',
            part: 'C',
            image: '',
        },
        {
            name: '조호형',
            part: 'D',
            image: '',
        },
        {
            name: '한재혁',
            part: 'E',
            image: '',
        },
        {
            name: '홍성목',
            part: 'F',
            image: '',
        },
    ]
    return (
        <Container>
            내용물은 이름, 현재 담당 파트
            <br />
            <Grid container spacing={4} data={coDevelopers}>
                { coDevelopers.map((Dev) => (
                    <Grid item xs={4}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                component="img"
                                height="140"
                                image="/static/images/cards/contemplative-reptile.jpg"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    { Dev.name }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    { Dev.part }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

// function ImgMediaCard(props) {
//     const eventCard = props.data.map(event => (
//         <Card
//             sx={{ maxWidth: 345 }}
//             style={{ margin: "10px" }}
//             key={event.name}
//         >
//             <CardMedia
//             component="img"
//             alt="portrait"
//             height="140"
//             image="event.image"
//             />
//             <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                     {event.name}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {event.part}
//                 </Typography>
//             </CardContent>
//         </Card>
//     ))
//     return (
//             <Grid item xs={4}>
//                 { eventCard }
//             </Grid>
//         );
//     }

export default Intro;