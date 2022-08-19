import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

function Intro2 () {
  const coDevelopers = [
    {
        name: '이정재',
        image: '${process.env.PUBLIC_URL}/img/Intro/Lee.jpg',
        part: 'BackEnd/Server',
        stack: 'Java/Spring',
    },
    {
        name: '김주원',
        image: `${process.env.PUBLIC_URL}/img/Intro/Kim.jpg`,
        part: 'BackEnd/Server',
        stack: 'Java/Spring',
    },
    {
        name: '홍성목',
        image: `${process.env.PUBLIC_URL}/img/Intro/Hong.jpg`,
        part: 'BackEnd/Server',
        stack: 'Java/Spring',
    },
    {
        name: '임진현',
        image: `${process.env.PUBLIC_URL}/img/Intro/Im.jpg`,
        part: 'FrontEnd/Hybrid',
        stack: 'TypeScript/React-native',
    },
    {
        name: '조호형',
        image: `${process.env.PUBLIC_URL}/img/Intro/Jo.jpg`,
        part: 'FrontEnd/Hybrid',
        stack: 'TypeScript/React-native',
    },
    {
        name: '한재혁',
        image: `${process.env.PUBLIC_URL}/img/Intro/Han.jpg`,
        part: 'FrontEnd/Web',
        stack: 'JavaScript/React',
    },
]
  return (
    <div 
      style={{
        marginBottom: "100px",
      }}
    >
      <Container>
        <br />
        <Grid container alignItems="stretch" spacing={4} data={coDevelopers}>
          { coDevelopers.map((Dev) => (
            <Grid key={Dev.name} item xs={4}>
              <Card sx={{ maxWidth: 345 }} style={{height: '100%'}}>
                <CardMedia
                  component="img"
                  height="500px"
                  image={Dev.image}
                  alt={Dev.name}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    { Dev.name }
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    담당파트: { Dev.part }
                    <br />
                    기술스택: { Dev.stack }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  )
}

export default Intro2