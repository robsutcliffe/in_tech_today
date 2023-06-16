import {
  getBlogPost,
  isMostlyEnglish,
  removeFirstHyphen,
  summarise,
} from "@utils";

import { addPosts } from "@services/post.service";
import {
  getNextPost,
  ignoreHoldingPost,
  removeHoldingPost,
} from "@services/holding.service";

import { getTagId } from "@services/tags.service";

export default async function handler(req, res) {
  try {
    const post = await getNextPost();

    if (!post) {
      res.status(200).json({ noPostsToSummarise: true });
    } else {
      const { html, description } = await getBlogPost(post.href);
      const nextPost = { ...post, summary: [], tags: [] };

      if (isMostlyEnglish(html) && html.length < 35000) {
        const fullResponse = await summarise(html);
        const parts = fullResponse.content.split("#");
        nextPost.summary = parts[0]
          .replace("hashtags: ", "")
          .split(new RegExp("- |\\n-"))
          .map((l) => removeFirstHyphen(l.trim()))
          .filter((l) => l);

        if (!nextPost.summary[1]) {
          nextPost.summary = nextPost.summary[0].split(". ");
        }
        nextPost.tags = parts
          .slice(1, -1)
          .map((l) => l.trim())
          .filter((l) => l);

        nextPost.tags = await Promise.all(
          nextPost.tags.map((newTag) => getTagId({ newTag }))
        );
        removeHoldingPost(post.href);
        await addPosts([nextPost]);
        res.status(200).json({ nextPost });
      } else {
        ignoreHoldingPost(post.href);
        res.status(200).json({ postIgnored: true });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
