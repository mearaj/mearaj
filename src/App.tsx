import { ThemeProvider, CssBaseline, Container, Box } from '@mui/material';
import theme from './theme';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DownloadPdfButton from './components/DownloadPdfButton';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />

      {/* Everything inside here will be captured */}
      <div id="portfolio-root">
        <Container maxWidth="lg" sx={{ pb: 10 }}>
          <Box id="home" sx={{ scrollMarginTop: 96 }}>
            <Hero />
          </Box>
          <Box id="about" sx={{ scrollMarginTop: 96 }}>
            <About />
          </Box>
          <Box id="projects" sx={{ scrollMarginTop: 96 }}>
            <Projects />
          </Box>
          <Box id="contact" sx={{ scrollMarginTop: 96 }}>
            <Contact />
          </Box>
        </Container>
      </div>
      <DownloadPdfButton containerId="portfolio-root" />
    </ThemeProvider>
  );
}
