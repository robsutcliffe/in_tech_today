import Head from "next/head";
import { PostCard, Container, Search, EventAtEnd } from "@components";
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
          <section className="divide-y divide-slate-100 lg:border-t lg:border-slate-100">
            <AnimatePresence>
              {loadedPosts?.map((post, postIdx) => (
                <motion.article
                  key={post.href}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      mass: 0.5,
                      stiffness: 50,
                      duration: 0.15,
                      delay: 0.15 * (postIdx % 5),
                      ease: "easeOut",
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.05 },
                  }}
                >
                  <PostCard post={post} />
                </motion.article>
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
