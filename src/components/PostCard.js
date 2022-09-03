import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Skeleton from "@mui/material/Skeleton";
import Moment from "react-moment";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
const axios = require("axios");

export default function PostCard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.realworld.io/api/articles?limit=10&offset=0")
      .then(function (response) {
        // handle success
        console.log("response:", response);
        const posts = response.data.articles;
        setPosts(posts);
      })
      .catch(function (error) {
        // handle error
        console.log("error:", error);
        setError(error);
      })
      .then(function () {
        setLoading(false);
      });
  }, []);

  const handleClick = (event, slug) => {
    console.log("event:", event);
    console.log("slug:", slug);
  };

  return (
    <>
      {loading ? (
        <Grid container direction="column" gap={4}>
          <Grid item>
            <Skeleton
              variant="rectangular"
              width={345}
              height={220}
              sx={{ borderRadius: "1rem" }}
            />
          </Grid>
          <Grid item>
            <Skeleton
              variant="rectangular"
              width={345}
              height={220}
              sx={{ borderRadius: "1rem" }}
            />
          </Grid>
          <Grid item>
            <Skeleton
              variant="rectangular"
              width={345}
              height={220}
              sx={{ borderRadius: "1rem" }}
            />
          </Grid>
        </Grid>
      ) : (
        posts.map((post) => {
          return (
            <Card
              sx={{ maxWidth: 345, m: 2, borderRadius: "1rem" }}
              key={post.slug}
            >
              <CardHeader
                avatar={
                  <Avatar
                    src={post.author.image}
                    aria-label="user avatar"
                    alt={post.author.username}
                  />
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={`${post.title} by ${post.author.username}`}
                subheader={
                  <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                }
              />
              <CardContent>
                {post.tagList.length > 0
                  ? post.tagList.map((tag, index) => {
                      return (
                        <Typography
                          sx={{ ml: 1 }}
                          key={index}
                          variant="caption"
                        >
                          #{tag}
                        </Typography>
                      );
                    })
                  : null}
                <Typography variant="body2" color="text.secondary">
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="like post">
                  <FavoriteIcon />
                </IconButton>
                <Typography variant="caption">{post.favoritesCount}</Typography>
                <IconButton
                  onClick={(event) => handleClick(event, post.slug)}
                  aria-label="view post"
                >
                  <VisibilityIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })
      )}
    </>
  );
}
