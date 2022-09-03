import { Container, Typography, Grid, Skeleton } from "@mui/material";
import { useEffect } from "react";

export default function PostDetails(props) {
  const { post, loading } = props;

  useEffect(() => {
    //
  }, []);

  return (
    <div>
      <Container>
        {loading ? (
          <Skeleton variant="rectangular" width={400} height={50} />
        ) : (
          <Grid container direction="column" alignContent="center">
            <Grid item>
              <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
                {post.title} by
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {post.description}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                sx={{ textAlign: "center", mt: 2 }}
              >
                {post.body}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
}
