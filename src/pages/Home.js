import { Container } from "@mui/system";
import * as React from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  return (
    <div>
      <Container>
        <h1>Homepage</h1>
        <PostCard />
      </Container>
    </div>
  );
}
