import { Grid, Card, CardMedia, CardContent, Typography, Stack, Button } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import links from '../data/links.json';

type LinkItem = {
  title: string;
  url: string;
  slug: string;
};

export default function LinkGallery() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Links</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {(links as LinkItem[]).map((item) => (
          <Grid key={item.slug} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card variant="outlined" className="avoid-break-inside" sx={{ overflow: 'hidden' }}>
              <CardMedia
                component="img"
                // The workflow will create these files automatically:
                src={`/shots/${item.slug}.png`}
                alt={item.title}
                onError={(e: any) => { e.currentTarget.style.display = 'none'; }}
              />
              <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={2}>
                  <Typography variant="subtitle1" noWrap title={item.title}>
                    {item.title}
                  </Typography>
                  <Button
                    size="small"
                    variant="outlined"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    endIcon={<OpenInNewIcon />}
                  >
                    Open
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
