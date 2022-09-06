import { Grid, TextField, IconButton, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentsContext";
const axios = require("axios");

export default function CommentInput(props) {
  const { post } = props;
  const { dispatch } = useCommentsContext();
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  const [error, setError] = useState({});
  const { user } = useAuthContext();

  const handleClick = () => {
    setLoading(true);
    setError({});
    axios
      .post(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        {
          comment: { body: comment },
        },
        {
          headers: {
            authorization: `Bearer ${user.token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(function (response) {
        // handle success
        const comment = response.data.comment;

        dispatch({ type: "CREATE_COMMENTS", payload: comment });
        setLoading(false);
        setComment("");
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .then(function () {
        // always executed
        setLoading(false);
      });
  };

  useEffect(() => {
    setSlug(post.slug);
  }, [post.slug]);

  return (
    <Fragment>
      <Grid container alignItems="center" sx={{ mt: 2, mb: 2 }}>
        <Grid item>
          <TextField
            id="outlined-textarea"
            label="Comment"
            placeholder="Comment here"
            multiline
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            size="small"
            disabled={loading}
          />
        </Grid>
        <Grid item>
          <IconButton disabled={loading} sx={{ ml: 2 }} onClick={handleClick}>
            <SendIcon />
          </IconButton>
        </Grid>
        <Grid item>
          {error && (
            <Typography variant="caption" sx={{ color: "red" }}>
              {error.message}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
}
