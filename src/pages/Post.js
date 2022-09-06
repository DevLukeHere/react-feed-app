import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import PostDetails from "../components/PostDetails";
import { useParams } from "react-router-dom";
import { useCommentsContext } from "../hooks/useCommentsContext";
const axios = require("axios");

export default function Post() {
  const { slug } = useParams();
  const { dispatch } = useCommentsContext();
  const [post, setPost] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError({})

    axios
      .get(`https://api.realworld.io/api/articles/${slug}`)
      .then(function (response) {
        // handle success
        const post = response.data.article;
        setPost(post);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });

    axios
      .get(`https://api.realworld.io/api/articles/${slug}/comments`)
      .then(function (response) {
        // handle success
        const comments = response.data.comments;
        dispatch({ type: "SET_COMMENTS", payload: comments });
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .then(function () {
        // always executed
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <PostDetails post={post} loading={loading} />
          </Grid>
          {error && (
            <Grid item>
              <Typography variant="caption" sx={{ color: "red" }}>
                {error.message}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
}
