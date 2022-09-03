import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import * as React from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <div>
      <Container>
        <Typography variant="h4">Homepage</Typography>
        <PostCard />
      </Container>
    </div>
  );
}
