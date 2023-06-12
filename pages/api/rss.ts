import getRSSFeed from "../../utils/getRSSFeed";
export default async function handler(req, res) {
  const newPosts = await getRSSFeed();
  //const newPosts = await getPostsFromAppDEv();
  await res.status(200).json({ newPosts });
}
