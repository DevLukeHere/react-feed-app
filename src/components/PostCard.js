import * as React from "react";
import { useEffect, useState, Fragment } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Moment from "react-moment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Tooltip,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Skeleton,
  Grid,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

export default function PostCard() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://api.realworld.io/api/articles?limit=10&offset=0")
      .then(function (response) {
        // handle success
        const posts = response.data.articles;
        setPosts(posts);
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
  }, []);

  const handleClick = (event, slug) => {
    navigate(`/post/${slug}`);
  };

  console.log("error:", error);

  return (
    <Fragment>
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
                title={`${post.title} by ${post.author.username}`}
                subheader={
                  <Moment format="DD/MM/YYYY">{post.createdAt}</Moment>
                }
              />
              <CardContent>
                {post.tagList.length > 0
                  ? post.tagList.map((tag, index) => {
                      return (
                        <Chip
                          sx={{ m: 0.5 }}
                          variant="outlined"
                          key={index}
                          label={`#${tag}`}
                          size="small"
                          color="primary"
                        />
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
                <Tooltip title="view post" placement="top" arrow>
                  <IconButton
                    onClick={(event) => handleClick(event, post.slug)}
                    aria-label="view post"
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          );
        })
      )}
    </Fragment>
  );
}
