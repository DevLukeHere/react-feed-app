import { Typography, Container, Grid } from "@mui/material";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <Typography sx={{ textAlign: "center", mt: 2 }} variant="h4">
              FEED
            </Typography>
          </Grid>
          <Grid item>
            <PostCard />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
