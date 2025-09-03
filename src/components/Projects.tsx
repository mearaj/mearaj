import { useEffect, useState } from 'react';
import {
  Card, CardContent, CardActions, Button, Typography,
  Grid, Chip, Stack, Skeleton
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { portfolio } from '../data/portfolio';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  archived: boolean;
  updated_at: string;
};

export default function Projects() {
  const [repos, setRepos] = useState<Repo[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${portfolio.githubUsername}/repos?per_page=100&sort=updated`
        );
        if (!res.ok) throw new Error(`GitHub API: ${res.status}`);
        const data: Repo[] = await res.json();
        const filtered = data
          .filter((r) => !r.fork && !r.archived)
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 8);
        setRepos(filtered);
      } catch (e: any) {
        setError(e?.message ?? 'Failed to load projects.');
      }
    })();
  }, []);

  return (
    // exporter waits for this attribute before capturing
    <div data-export-ready={repos ? 'true' : undefined}>
      <Typography variant="h4" gutterBottom>Projects</Typography>
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {(repos ?? Array.from({ length: 6 })).map((r: any, idx) => (
          <Grid key={r?.id ?? idx} size={{ xs: 12, sm: 6, md: 4 }}>
            {repos ? (
              <Card
                variant="outlined"
                className="avoid-break-inside"
                sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="h6" fontWeight={700}>{r.name}</Typography>
                    {!!r.stargazers_count && <Chip size="small" label={`★ ${r.stargazers_count}`} />}
                  </Stack>
                  <Typography color="text.secondary" sx={{ mt: 1, minHeight: 42 }}>
                    {r.description ?? 'No description provided.'}
                  </Typography>
                  {r.language && <Chip size="small" variant="outlined" sx={{ mt: 1 }} label={r.language} />}
                </CardContent>
                <CardActions>
                  <Button href={r.html_url} target="_blank" rel="noreferrer" endIcon={<OpenInNewIcon />}>
                    View on GitHub
                  </Button>
                </CardActions>
              </Card>
            ) : (
              <Card variant="outlined" className="avoid-break-inside">
                <CardContent>
                  <Skeleton width="60%" />
                  <Skeleton width="80%" />
                  <Skeleton width="40%" />
                </CardContent>
              </Card>
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
