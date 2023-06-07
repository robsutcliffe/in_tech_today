import { getPosts } from "@services/post.service";
import { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@models/post.model";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { page } = req.query as { page: string };
  const posts: Post[] = await getPosts(parseInt(page));
  res.status(200).json({ posts });
}
