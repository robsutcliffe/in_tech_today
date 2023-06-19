import Head from "next/head";
import { PostCard } from "@components";
import { useState, useEffect } from "react";
import { useQueryState } from "next-usequerystate";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export default function Home() {
  const { initialData } = useSWR(
    "/api/posts/0",
    async (url) => await axios.get(url).then((res) => res.data)
  );
  const [bottomRef, inView] = useInView();
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useQueryState("search");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    if (initialData?.posts) {
      setLoadedPosts((prev) => [...initialData.posts, ...prev]);
    }
  }, [initialData]);

  useEffect(() => {
    const searchRequest = axios.CancelToken.source();

    // setting it to null to remove from the url
    if (!searchTerm) {
      setSearchTerm(null);
    }
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

      <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
        <div className="lg:max-w-4xl lg:px-8">
          <div className="relative mt-2 rounded-md shadow-sm">
            <input
              type="text"
              name="account-number"
              id="account-number"
              className="
                px-2
                block
                w-full
                rounded-md
                border-0
                py-1.5
                pr-10
                text-gray-900
                ring-1
                ring-inset
                ring-gray-300
                placeholder:text-gray-400
                focus:ring-2
                focus:ring-inset
                focus:ring-indigo-600
                sm:text-sm sm:leading-6"
              placeholder="Search"
              value={searchTerm}
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

        <AnimatePresence>
          {loadedPosts?.map((post, postIdx) => (
            <motion.div
              key={post.href}
              initial={{ opacity: 0, y: 200, scale: 0.9 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  type: "spring",
                  mass: 0.5,
                  stiffness: 50,
                  duration: 0.2,
                  delay: 0.1 * (postIdx % 5),
                  ease: "easeOut",
                },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
            >
              <PostCard post={post} searchTerm={searchTerm} />
            </motion.div>
          ))}
        </AnimatePresence>

        {hasMorePosts && (
          <div
            ref={bottomRef}
            className="my-12 w-full text-gray-700 text-center animate-pulse"
          >
            loading more...
          </div>
        )}
      </div>
    </>
  );
}
