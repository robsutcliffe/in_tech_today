import Head from "next/head";
import { Container, Search, Posts } from "@components";
import { PostsContextProvider } from "@context/posts.context";

export default function Home() {
  return (
    <>
      <Head>
        <title>Fast Feed</title>
        <meta name="Fast Feed" content="Blog Post Summaries" />
        <meta
          name="google-site-verification"
          content="JAV84sKtYCBXd_7M2YollrvBQlOvSW5Thse7o6ysWzk"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Summarized development blog posts everyday"
        />
      </Head>

      <main>
        <PostsContextProvider>
          <Container>
            <nav className="my-4 lg:my-8">
              <Search />
            </nav>
          </Container>

          <Posts />
        </PostsContextProvider>
      </main>
    </>
  );
}
