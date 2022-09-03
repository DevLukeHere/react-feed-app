import { Typography, Container } from "@mui/material";
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
