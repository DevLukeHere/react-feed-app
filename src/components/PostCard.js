import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Moment from "react-moment";
const axios = require("axios");

export default function PostCard() {
  const [expanded, setExpanded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(" https://api.realworld.io/api/articles?limit=10&offset=0")
      .then(function (response) {
        // handle success
        console.log("response:", response);
        setLoading(true);
        if (response.status === 200) {
          const posts = response.data.articles;
          setLoading(false);
          setPosts(posts);
        }
      })
      .catch(function (error) {
        // handle error
        console.log("error:", error);
        setError(error);
      });
  }, []);

  return (
    <>
      {posts.map((post) => {
        return (
          <Card sx={{ maxWidth: 345, m: 2 }} key={post.slug}>
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
              subheader={<Moment format="DD/MM/YYYY">{post.createdAt}</Moment>}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="like post">
                <FavoriteIcon />
              </IconButton>
              <Typography variant="caption">{post.favoritesCount}</Typography>
            </CardActions>
          </Card>
        );
      })}
    </>
  );
}
