import {Box, Container, Typography} from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{py: 4, borderTop: '1px solid rgba(255,255,255,0.08)', mt: 0}}>
      <Container>
        <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} mearaj • Built with React &
          MUI</Typography>
      </Container>
    </Box>
  );
}
