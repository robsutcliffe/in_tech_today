import getPosts from "../../utils/getPosts";
import getRSSFeed from "../../utils/getRSSFeed";
import getPostsFromAppDEv from "../../utils/getPostsFromAppDev";
import tldrThis from "../../utils/tldrThis";
import pLimit from "p-limit";

import { addPosts, checkPostUrl } from "@services/post.service";

const limit = pLimit(1);

export default async function handler(req, res) {
  try {
    const rawPosts = [
      ...(await getPosts()),
      ...(await getRSSFeed()),
      ...(await getPostsFromAppDEv()),
    ];
    res.status(200).json({ rawPosts });
    const newPosts = [];
    for (const post of rawPosts) {
      const isNewPost = await checkPostUrl(post);
      if (!isNewPost) {
        newPosts.push(post);
      }
    }

    const summarisePromise = newPosts.map((post) => {
      return limit(async () => {
        const { summary } = await tldrThis(post.href);
        if (summary) {
          return {
            ...post,
            summary,
          };
        }
      });
    });

    const summarisedPosts = await Promise.all(summarisePromise);

    await addPosts(summarisedPosts);
    res.status(200).json({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
