import getPostsFromBfD from "../../utils/getPostsFromBfD";
import getRSSFeed from "../../utils/getRSSFeed";
import getPostsFromAppDEv from "../../utils/getPostsFromAppDev";
import getBlogPost from "@utils/getBlogPost";
import pLimit from "p-limit";

import { addPosts, checkPostUrl } from "@services/post.service";
import summarizeBlogPost from "@utils/summarise";

const limit = pLimit(1);

function isMostlyEnglish(str) {
  // Count the number of English characters in the string
  let englishCount = 0;

  for (let i = 0; i < str.length; i++) {
    // Check if the character is within the English alphabet range (a-z or A-Z)
    if ((str[i] >= "a" && str[i] <= "z") || (str[i] >= "A" && str[i] <= "Z")) {
      englishCount++;
    }
  }

  // Calculate the percentage of English characters
  const englishPercentage = (englishCount / str.length) * 100;

  // Return true if the English percentage is at least 75, otherwise false
  return englishPercentage >= 75;
}

function removeFirstHyphen(str) {
  if (str.charAt(0) === "-") {
    return str.substring(1);
  } else {
    return str;
  }
}

export default async function handler(req, res) {
  try {
    const rawPosts = [
      ...(await getPostsFromBfD()),
      ...(await getRSSFeed()),
      ...(await getPostsFromAppDEv()),
    ];

    const newPosts = [];
    for (const post of rawPosts) {
      const isNewPost = await checkPostUrl(post);
      if (!isNewPost) {
        newPosts.push(post);
      }
    }

    const summarisePromise = newPosts.map((post) => {
      return limit(async () => {
        const { html, description } = await getBlogPost(post.href);

        if (isMostlyEnglish(html)) {
          post.summary = `${description}`;
          if (html.length < 35000) {
            const fullResponse = await summarizeBlogPost(html);
            const parts = fullResponse.content.split("#");
            post.summary = parts[0]
              .replace("hashtags: ", "")
              .split(new RegExp("- |\\n-"))
              .map((l) => removeFirstHyphen(l.trim()))
              .filter((l) => l);

            if (!post.tags[0]) {
              post.tags = parts
                .slice(1, -1)
                .map((l) => l.trim())
                .filter((l) => l);
            }

            if (post.summary && post.tags) {
              return post;
            }
          }
        }
      });
    });

    const summarisedPosts = await Promise.all(summarisePromise);

    await addPosts(summarisedPosts);
    res.status(200).json({ summarisedPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}
