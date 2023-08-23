import { getPosts, searchPosts } from "@services/post.service";
import { NextRequest } from "next/server";
import { Post } from "@models/post.model";

import { Amplify } from "aws-amplify";
import awsExports from "../../../src/aws-exports";
Amplify.configure({ ...awsExports });

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest): Promise<Response> {
  const page = Number(req.nextUrl.searchParams.get("page") ?? "0");
  const searchTerm = req.nextUrl.searchParams.get("searchTerm") ?? "";

  let posts: Post[];
  if (searchTerm) {
    posts = await searchPosts(page, searchTerm);
  } else {
    posts = await getPosts(page);
  }

  const responseBody = JSON.stringify({ posts });

  const responseHead = {
    "Content-Type": "application/json",
    "Cache-Control": "s-maxage=86400,stale-while-revalidate=59",
  };

  return new Response(responseBody, { headers: responseHead });
}
