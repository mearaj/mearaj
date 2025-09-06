import { Box, Container, Typography } from '@mui/material';

export default function About() {
  return (
    <Container id="about" disableGutters sx={{ scrollMarginTop: 96 }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          About
        </Typography>

        <Typography color="text.secondary" paragraph>
          I am a developer from Mumbai, India, and my professional journey began in 2003.
        </Typography>

        <Typography color="text.secondary" paragraph>
          For nine years, I served as the Managing Director of my father’s company,{' '}
          <Box component="span" fontWeight={700}>Bushra General Trading LLC</Box>,
          where my primary responsibility was overseeing the company’s accounting operations.
          After nearly a decade in this role, I decided to pursue a different path that aligned with my passion for technology.
        </Typography>

        <Typography color="text.secondary" paragraph>
          In 2013, I began learning various programming languages through platforms such as YouTube, Udemy,
          and other online resources. To strengthen my skills, I started participating in competitive programming challenges
          on <Box component="span" fontWeight={700}>Topcoder</Box> (from 2018 onward) and also took on private projects to gain hands-on experience.
        </Typography>
      </Box>
    </Container>
  );
}
