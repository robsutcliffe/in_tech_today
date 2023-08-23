import * as React from "react";
import type { AppProps } from "next/app";
import { Layout } from "@components";
import { PostsContextProvider } from "@context/posts.context";
import "@styles/globals.css";

const MyApp: React.FunctionComponent<AppProps> = ({ Component, pageProps }) => {
  return (
    <PostsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PostsContextProvider>
  );
};

export default MyApp;
