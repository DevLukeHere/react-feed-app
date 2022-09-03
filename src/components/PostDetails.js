import { Container, Typography, Grid } from "@mui/material";
import { useEffect } from "react";

export default function PostDetails() {
  useEffect(() => {
    //
  }, []);

  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 2 }}>
              Title
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
