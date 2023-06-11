import Head from "next/head";
import { PostCard, Button } from "@components";
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

          {hasMorePosts && (
            <div className="text-center">
              <div className="py-6 lg:max-w-4xl">
                <Button
                  disabled={isLoading}
                  onClick={handleClick}
                  text="Load More Posts"
                  Icon={isLoading ? ArrowPathIcon : ArrowDownTrayIcon}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
