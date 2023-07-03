import Head from "next/head";
import { PostCard, Container, Search, EventAtEnd, FadeIn } from "@components";
import { useContext } from "react";
import { PostsContext } from "@context/posts.context";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { loadedPosts, handleLoadMore, hasMorePosts } =
    useContext(PostsContext);

  return (
    <>
      <Head>
        <title>Blog Summary</title>
        <meta name="blog summaries" content="Blog Post Summaries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <nav className="sm:my-4 lg:my-8">
            <Search />
          </nav>
        </Container>

        <EventAtEnd onEnd={handleLoadMore}>
          <section className="divide-y-4 divide-slate-50 lg:border-t-4 lg:border-slate-50">
            <AnimatePresence>
              {loadedPosts?.map((post, postIdx) => (
                <article key={post.href} className="overflow-hidden">
                  <FadeIn delay={0.15 * (postIdx % 5)}>
                    <PostCard post={post} />
                  </FadeIn>
                </article>
              ))}
            </AnimatePresence>
          </section>

          {hasMorePosts && (
            <Container>
              <footer className="my-12 w-full text-gray-700 text-center animate-pulse">
                loading...
              </footer>
            </Container>
          )}
        </EventAtEnd>
      </main>
    </>
  );
}
