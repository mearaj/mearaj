import { Button, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { exportElementToPdfPaged } from '../utils/exportPdf';

export default function DownloadPdfButton({ containerId }: { containerId: string }) {
  const onClick = async () => {
    const el = document.getElementById(containerId);
    if (!el) return alert(`Container #${containerId} not found`);
    await exportElementToPdfPaged(el, {
      page: 'a4',
      marginMm: 6,
      scale: 2,
    });
  };

  return (
    <Box sx={{ position: 'fixed', right: 24, bottom: 24, zIndex: 1500 }}>
      <Button variant="contained" startIcon={<DownloadIcon />} onClick={onClick}>
        Download PDF
      </Button>
    </Box>
  );
}
