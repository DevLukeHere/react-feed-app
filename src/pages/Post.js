import { Container, Typography, Grid } from "@mui/material";
import { useEffect } from "react";
import PostDetails from "../components/PostDetails";

export default function Post() {
  useEffect(() => {
    //
  }, []);

  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
              POST
            </Typography>
          </Grid>
          <Grid item>
            <PostDetails />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
