import Head from "next/head";
import { PostCard, Container, Search, EventAtEnd, FadeIn } from "@components";
import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

export default function Home() {
  const { loadedPosts, handleLoadMore, hasMorePosts } =
    useContext(PostsContext);

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
        <Container>
          <nav className="my-4 lg:my-8">
            <Search />
          </nav>
        </Container>

        <EventAtEnd onEnd={handleLoadMore}>
          <section className="divide-y-4 divide-slate-50 lg:border-t-4 lg:border-slate-50">
            {loadedPosts?.map((post, postIdx) => (
              <article key={post.href} className="overflow-hidden">
                <FadeIn delay={0.15 * (postIdx % 5)}>
                  <PostCard post={post} />
                </FadeIn>
              </article>
            ))}
          </section>
        </EventAtEnd>
        {hasMorePosts && (
          <Container>
            <footer className="my-12 w-full text-gray-700 text-center animate-pulse">
              loading...
            </footer>
          </Container>
        )}
      </main>
    </>
  );
}
