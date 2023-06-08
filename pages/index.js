import Head from "next/head";
import { PostCard } from "@components";
import { useState } from "react";
import { ArrowDownTrayIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

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

      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {loadedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}

          <div className="text-center">
            <div className="mt-6">
              {hasMorePosts && (
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleClick}
                  className="
                    inline-flex
                    items-center
                    rounded-md
                    bg-gray-800
                    px-3
                    py-2
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    hover:bg-grey-900
                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-indigo-600"
                >
                  {isLoading && (
                    <ArrowPathIcon
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  {!isLoading && (
                    <ArrowDownTrayIcon
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                  )}
                  Load More Posts
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
