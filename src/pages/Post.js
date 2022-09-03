import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import PostDetails from "../components/PostDetails";
import { useParams } from "react-router-dom";
const axios = require("axios");

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
        console.log("error:", error);
        setError(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });

    axios
      .get(` https://api.realworld.io/api/articles/${slug}/comments`)
      .then(function (response) {
        // handle success
        const comments = response.data.comments;
        setComments(comments);
      })
      .catch(function (error) {
        // handle error
        console.log("error:", error);
        setError(error);
      })
      .then(function () {
        // always executed
      });
  }, [slug]);

  return (
    <div>
      <Container>
        <Grid container direction="column" alignContent="center">
          <Grid item>
            <PostDetails post={post} loading={loading} comments={comments} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
