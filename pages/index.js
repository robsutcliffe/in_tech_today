import Head from "next/head";
import { PostCard } from "@components";
import { useState, useEffect, useRef } from "react";
import { useQueryState } from "next-usequerystate";
import axios from "axios";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const bottomRef = useRef(null);
  const inView = useInView(bottomRef);
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useQueryState("search");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    const searchRequest = axios.CancelToken.source();

    setTimeout(() => {
      let url = `/api/posts/${page}`;
      if (searchTerm) url += `?searchTerm=${searchTerm}`;

      setIsLoading(true);
      axios(url, {
        cancelToken: searchRequest.token,
      })
        .then((response) => {
          const { posts } = response.data;
          setHasMorePosts(posts.length === 5);
          setLoadedPosts((prevPosts) => [...prevPosts, ...posts]);
          setIsLoading(false);
        })
        .catch((error) => {});
    }, 200);

    return () => {
      searchRequest.cancel();
      setIsLoading(false);
    };
  }, [searchTerm, page]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchTerm(null);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoading && inView && hasMorePosts && loadedPosts?.length) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView]);

  const handleSearchChange = async (e) => {
    setPage(0);
    setLoadedPosts([]);
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Head>
        <title>Blog Summary</title>
        <meta name="blog summaries" content="Blog Post Summaries" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <nav className="lg:px-8 sm:my-4 lg:my-8">
          <div className="lg:max-w-4xl">
            <div className="relative mx-auto px-14 sm:px-10 md:max-w-2xl md:px-4 lg:px-2">
              <input
                type="text"
                name="account-number"
                id="account-number"
                className="
                px-2
                block
                w-full
                rounded-md
                shadow-sm
                border-0
                py-1.5
                pr-10
                text-gray-900
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:outline-none
                focus:ring-2
                focus:ring-inset
                focus:ring-yellow-500
                sm:text-sm sm:leading-6"
                placeholder="Search"
                value={searchTerm || ""}
                onChange={handleSearchChange}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </nav>

        <section className="divide-y divide-slate-100 lg:border-t lg:border-slate-100">
          <AnimatePresence>
            {loadedPosts?.map((post, postIdx) => (
              <motion.article
                key={post.href}
                initial={{ opacity: 0, y: 100, scale: 0.97 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
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
                <PostCard post={post} searchTerm={searchTerm} />
              </motion.article>
            ))}
          </AnimatePresence>
        </section>

        {hasMorePosts && (
          <footer
            ref={bottomRef}
            className="my-12 w-full text-gray-700 text-center animate-pulse"
          >
            loading more...
          </footer>
        )}
      </main>
    </>
  );
}
