import { Box, Stack, Typography, Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { portfolio } from '../data/portfolio';
import { exportElementToPdfPaged } from '../utils/exportPdf';

async function downloadPortfolioPdf() {
  const element = document.getElementById('portfolio-root'); // ✅ target the same container used by the floating button
  if (!element) return;
  await exportElementToPdfPaged(element, { page: 'a4', marginMm: 6, scale: 2 });
}

export default function Hero() {
  return (
    <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <Typography variant="h2" fontWeight={800} gutterBottom>
        Hi, I’m {portfolio.name} 👋
      </Typography>
      <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 760, mx: 'auto' }}>
        {portfolio.summary}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
        <Button variant="contained" startIcon={<DownloadIcon />} onClick={downloadPortfolioPdf}>
          Download PDF
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href={`https://github.com/${portfolio.githubUsername}`}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Button>
        <Button
          variant="outlined"
          endIcon={<OpenInNewIcon />}
          href="https://github.com/mearaj/mearaj"
          target="_blank"
          rel="noreferrer"
        >
          Repo
        </Button>
      </Stack>
    </Box>
  );
}
