import { Grid, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Fragment, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentsContext";
const axios = require("axios");

export default function CommentInput(props) {
  const { post } = props;
  const { dispatch } = useCommentsContext();
  const [comment, setComment] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuthContext();

  const handleClick = () => {
    setLoading(true);
    axios
      .post(`https://api.realworld.io/api/articles/${slug}/comments`, {
        comment: { body: comment },
      })
      .then(function (response) {
        // handle success
        const comment = response;
        console.log("comment:", comment);
        dispatch({ type: "CREATE_COMMENTS", payload: comment });
        setLoading(false);
        setComment("");
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
  };

  useEffect(() => {
    setSlug(post.slug);
    // console.log("user.token:", user.token)
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
          />
        </Grid>
        <Grid item>
          <IconButton sx={{ ml: 2 }} onClick={handleClick}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Fragment>
  );
}
