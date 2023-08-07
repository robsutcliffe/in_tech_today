import { getFromReddit } from "@utils";
export default async function handler(req, res) {
  const tweets = await getFromReddit();
  res.status(200).json({ tweets });
}
