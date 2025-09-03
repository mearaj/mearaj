import { Card, CardContent, Typography, Chip, Stack } from '@mui/material';
import { portfolio } from '../data/portfolio';

export default function About() {
  return (
    <Card variant="outlined" sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>About</Typography>
        <Typography color="text.secondary" paragraph>
          {portfolio.summary}
        </Typography>
        <Typography variant="h6" gutterBottom>Skills</Typography>
        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
          {portfolio.skills.map((s) => (
            <Chip key={s} label={s} variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
