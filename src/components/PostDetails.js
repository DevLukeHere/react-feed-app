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
} from "@mui/material";
import { Fragment, useEffect } from "react";
import CommentInput from "./CommentInput";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentsContext } from "../hooks/useCommentsContext";

export default function PostDetails(props) {
  const { post, loading } = props;
  const { comments } = useCommentsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    //
  }, []);

  return (
    <Fragment>
      <Container>
        {loading ? (
          <Skeleton variant="rectangular" width={400} height={50} />
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
                  Please sign in to comment on post
                </Typography>
              )}
            </Grid>
            <Grid item>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                {comments.map((comment) => (
                  <Fragment key={comment.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt="user avatar" src={comment.author.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author.username}
                        secondary={<Fragment>{comment.body}</Fragment>}
                      />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </Container>
    </Fragment>
  );
}
