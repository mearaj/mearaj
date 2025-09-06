// Hero.tsx
import {Avatar, Box, Chip, Container, Stack, Typography} from '@mui/material';
import {portfolio} from '../data/portfolio';
import DownloadPdfButton from './DownloadPdfButton';

export default function Hero() {
  return (
    <Box
      id="home"
      sx={{
        pt: {xs: 6, md: 10},
        pb: {xs: 6, md: 10},
        background: (t) =>
          t.palette.mode === 'dark'
            ? `radial-gradient(900px 500px at 15% -10%, rgba(124,92,255,0.25), transparent 60%),
               radial-gradient(800px 400px at 90% -5%, rgba(14,165,233,0.22), transparent 55%)`
            : undefined,
      }}
    >
      <Container>
        <Stack spacing={{xs: 4, sm: 5, md: 6}} alignItems="center" textAlign="center">
          <Avatar src="/profile.jpg" alt={portfolio.name} sx={{width: 96, height: 96, boxShadow: 3}}/>
          <Stack spacing={1}>
            <Chip
              label={
                <>
                  Cross-platform apps developer for <br/>
                  Browser • Desktop • Mobile
                </>
              }
              color="primary"
              variant="outlined"
              sx={{
                alignSelf: 'center',
                fontWeight: 700,
                borderRadius: 999,
                whiteSpace: 'normal',
                lineHeight: 1.4,
                textAlign: 'center',
                px: 2,
                py: 3,
              }}
            />
            <Typography variant="h1">Hi, I’m {portfolio.name}.</Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: 'clamp(1.125rem, 1.2vw + 1rem, 1.5rem)',
                color: 'text.secondary',
              }}
            >
              {portfolio.summary}
            </Typography>

            {/* Download button right below */}
            <DownloadPdfButton containerId="portfolio-root"/>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
