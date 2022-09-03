import { Typography, Container, Grid } from "@mui/material";

export default function CommentInput() {
  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <Typography sx={{ textAlign: "center", mt: 2 }} variant="h4">
              COMMENT INPUT
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
