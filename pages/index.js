import Head from "next/head";
import Menu from "@components/Menu";
import PostCard from "@components/PostCard";
import { useState } from "react";
import { Stack, Container, Box, Button } from "@mui/material";
import { getPosts } from "@services/post.service";

export async function getServerSideProps() {
  const posts = JSON.stringify(await getPosts(0));

  return {
    props: {
      posts,
    },
  };
}

export default function Home(props) {
  const [loadedPosts, setLoadedPosts] = useState(JSON.parse(props.posts));
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const handleClick = async () => {
    setIsLoading(true);
    const response = await fetch(`/api/posts/${page + 1}`);
    const { posts } = await response.json();
    setHasMorePosts(posts.length === 5);
    setLoadedPosts((prevPosts) => [...prevPosts, ...posts]);
    setPage((prevPage) => prevPage + 1);
    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>Blog Summary</title>
        <meta name="blog summaries" content="Blog Post Summaries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <Menu />
        <Container
          maxWidth="md"
          sx={{ paddingTop: "86px", paddingBottom: "24px" }}
        >
          <Stack spacing={2}>
            {loadedPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {hasMorePosts && (
              <Box display="flex" justifyContent="center">
                <Button
                  onClick={handleClick}
                  variant="contained"
                  disabled={isLoading}
                >
                  Load More Posts
                </Button>
              </Box>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}
