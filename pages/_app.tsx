import * as React from "react";
import type { AppProps } from "next/app";
import { Layout } from "@components";
import { PostsContextProvider } from "@context/posts.context";
import "@styles/globals.css";

import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });

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
