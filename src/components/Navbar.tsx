import { AppBar, Toolbar, Typography, Stack, Button, Container } from '@mui/material';

export default function Navbar() {
  return (
    <AppBar position="sticky" elevation={0} color="inherit" sx={{ borderBottom: '1px solid #eee' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={700}>
            mearaj
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button href="#home">Home</Button>
            <Button href="#about">About</Button>
            <Button href="#projects">Projects</Button>
            <Button href="#contact" variant="contained">Contact</Button>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
