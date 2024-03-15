import React, { useEffect, useState } from "react";
import { useQueryState } from "next-usequerystate";
import axios from "axios";
import { Post } from "@models/post.model";

interface PostsContextType {
  loadedPosts: Post[];
  hasMorePosts: boolean;
  searchTerm: string;
  handleLoadMore: () => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const PostsContext = React.createContext<PostsContextType | null>(null);

const PostsContextProvider = (props) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useQueryState("search");
  const [isLoading, setIsLoading] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    if (searchTerm === "") {
      setSearchTerm(null);
    }
  }, [searchTerm]);

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
        .catch((error) => {
          console.log(error);
        });
    }, 200);

    return () => {
      searchRequest.cancel();
      setIsLoading(false);
    };
  }, [searchTerm, page]);

  const handleSearchChange = async (e) => {
    setPage(0);
    setLoadedPosts([]);
    await setSearchTerm(e.target.value);
  };

  const handleLoadMore = () => {
    if (!isLoading && hasMorePosts && loadedPosts?.length) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const postsContextValue: PostsContextType = {
    loadedPosts,
    hasMorePosts,
    searchTerm,
    handleLoadMore,
    handleSearchChange,
  };

  return (
    <PostsContext.Provider value={postsContextValue}>
      {props.children}
    </PostsContext.Provider>
  );
};

export { PostsContext, PostsContextProvider };
