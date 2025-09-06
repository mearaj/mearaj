import { Container, Box, Typography, Stack, Chip } from '@mui/material';
import { portfolio } from '../data/portfolio';

export default function Skills() {
  return (
    <Container id="skills" disableGutters sx={{ scrollMarginTop: 96 }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          My Skills
        </Typography>
      </Box>

      {/* Section 1 */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Gained through experience
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1.25}>
          {portfolio.skillsGained.map((s) => (
            <Chip key={`exp-${s}`} label={s} sx={{ fontWeight: 600 }} />
          ))}
        </Stack>
      </Box>

      {/* Section 2 */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          I am good at
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1.25}>
          {portfolio.skillsGoodAt.map((s) => (
            <Chip key={`good-${s}`} label={s} sx={{ fontWeight: 600 }} />
          ))}
        </Stack>
      </Box>

      {/* Section 3 */}
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          I love
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1.25}>
          {portfolio.skillsGoodAt.map((s) => (
            <Chip key={`learn-${s}`} label={s} sx={{ fontWeight: 600 }} />
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
