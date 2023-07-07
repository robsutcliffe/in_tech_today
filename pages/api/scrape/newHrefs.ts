import { getPostsFromAppDEv, getRSSFeed } from "@utils";
import { addPost, getAllHrefs } from "@services/holding.service";

export default async function handler(req, res) {
  try {
    const rawPosts = [
      ...(await getRSSFeed()),
      ...(await getPostsFromAppDEv("popular")),
      ...(await getPostsFromAppDEv("discussed")),
      ...(await getPostsFromAppDEv("upvoted")),
    ];

    const allHrefs = await getAllHrefs();
    const filter = (post) => !allHrefs.includes(post.href);
    const filteredPosts = rawPosts.filter(filter);
    for (const post of filteredPosts) {
      await addPost(post);
    }

    res.status(200).json({ complete: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
