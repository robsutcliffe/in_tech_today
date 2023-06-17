import { getPosts, searchPosts } from "@services/post.service";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@models/post.model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { page, searchTerm } = req.query as {
    page: string;
    searchTerm: string;
  };
  if (searchTerm) {
    const posts: Post[] = await searchPosts(parseInt(page), searchTerm);
    res.status(200).json({ posts });
  } else {
    const posts: Post[] = await getPosts(parseInt(page));
    res.status(200).json({ posts });
  }
}
