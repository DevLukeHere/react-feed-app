import {
  Container,
  Typography,
  Grid,
  Skeleton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Fragment, useState } from "react";
import CommentInput from "./CommentInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentsContext";
const axios = require("axios");

export default function PostDetails(props) {
  const { post, loading } = props;
  const { comments, dispatch } = useCommentsContext();
  const { user } = useAuthContext();
  const [error, setError] = useState({});

  const handleDelete = (id) => {
    setError({});

    axios
      .delete(
        `https://api.realworld.io/api/articles/${post.slug}/comments/${id}`,
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
        dispatch({ type: "DELETE_COMMENT", payload: response.data });
      })
      .catch(function (error) {
        // handle error
        setError(error);
      })
      .then(function () {
        // always executed
      });
  };

  return (
    <Fragment>
      <Container>
        {loading ? (
          <Grid container direction="column" alignContent="center">
            <Grid item>
              <Skeleton
                variant="rectangular"
                width={500}
                height={25}
                sx={{ margin: "1rem" }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="rectangular"
                width={500}
                height={25}
                sx={{ margin: "1rem" }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="rectangular"
                width={500}
                height={25}
                sx={{ margin: "1rem" }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="rectangular"
                width={500}
                height={25}
                sx={{ margin: "1rem" }}
              />
            </Grid>
            <Grid item>
              <Skeleton
                variant="rectangular"
                width={400}
                height={50}
                sx={{ margin: "1rem" }}
              />
            </Grid>
          </Grid>
        ) : (
          <Grid container direction="column" alignContent="center">
            <Grid item>
              <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
                {post.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", mt: 2, fontStyle: "italic" }}
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
            <Grid item>
              <Typography variant="h6" sx={{ mt: 2 }}>
                Comments
              </Typography>
              {user ? (
                <CommentInput post={post} />
              ) : (
                <Typography variant="subtitle2" sx={{ color: "red" }}>
                  Please sign in to comment
                </Typography>
              )}
            </Grid>
            {error && (
              <Grid item>
                <Typography variant="caption" sx={{ textAlign: "center", mt: 2, color: "red" }}>
                  {error.message}
                </Typography>
              </Grid>
            )}
            {comments ? (
              <Grid item>
                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                  {comments.map((comment) => (
                    <Fragment key={comment.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar
                            alt="user avatar"
                            src={comment.author.image}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={comment.author.username}
                          secondary={<Fragment>{comment.body}</Fragment>}
                        />
                        <IconButton onClick={() => handleDelete(comment.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </Fragment>
                  ))}
                </List>
              </Grid>
            ) : null}
          </Grid>
        )}
      </Container>
    </Fragment>
  );
}
