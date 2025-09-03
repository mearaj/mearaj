import {Button, Card, CardContent, Stack, Typography} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {portfolio} from '../data/portfolio';

export default function Contact() {
  const hasEmail = Boolean(portfolio.email);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h4" gutterBottom>Contact</Typography>
        <Typography color="text.secondary" paragraph>
          I’m open to interesting opportunities and collaborations.
        </Typography>

        <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
          {hasEmail && (
            <Button
              variant="contained"
              startIcon={<EmailIcon/>}
              href={`mailto:${portfolio.email}`}
            >
              Email
            </Button>
          )}
          {portfolio.socials.map((s) => (
            <Button
              key={s.href}
              variant="outlined"
              endIcon={<OpenInNewIcon/>}
              href={s.href}
              target="_blank"
              rel="noreferrer"
            >
              {s.label}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
