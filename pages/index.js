import Head from "next/head";
import { PostCard, Button } from "@components";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

export default function Home() {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    const searchRequest = axios.CancelToken.source();

    setTimeout(() => {
      setIsLoading(true);
      axios(`/api/posts/${page}?searchTerm=${searchTerm}`, {
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

  const getMorePosts = async () => {
    setPage((prevPage) => prevPage + 1);
  };

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
          <label
            htmlFor="account-number"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search
          </label>
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

        {loadedPosts.map((post) => (
          <PostCard key={post.id} post={post} searchTerm={searchTerm} />
        ))}

        {hasMorePosts && (
          <div className="text-center">
            <div className="py-6 lg:max-w-4xl">
              <Button
                disabled={isLoading}
                onClick={getMorePosts}
                text="Load More Posts"
                Icon={isLoading ? ArrowPathIcon : ArrowDownTrayIcon}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
