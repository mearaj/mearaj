// src/components/UrlScreenshot.tsx
import { useMemo } from 'react';
import { Card, CardContent, CardMedia, Typography, Stack, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

type Props = {
  url: string;
  title?: string;
  width?: number;   // screenshot width in px
  crop?: number;    // crop height in px
};

export default function UrlScreenshot({ url, title, width = 1200, crop = 800 }: Props) {
  // Thum.io docs: https://image.thum.io
  // crossOrigin is set; service must return CORS headers for html2canvas to include it
  const src = useMemo(
    () => `https://image.thum.io/get/width/${width}/crop/${crop}/${encodeURIComponent(url)}`,
    [url, width, crop]
  );

  return (
    <Card variant="outlined" sx={{ overflow: 'hidden' }}>
      <CardMedia
        component="img"
        src={src}
        crossOrigin="anonymous"
        alt={title ?? url}
        sx={{ display: 'block' }}
      />
      <CardContent>
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
          <Typography variant="subtitle1" noWrap title={title ?? url}>
            {title ?? url}
          </Typography>
          <Button size="small" variant="outlined" href={url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />}>
            Open
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
