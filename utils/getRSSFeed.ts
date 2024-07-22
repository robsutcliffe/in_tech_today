import Parser from "rss-parser";
import { Post } from "@models/post.model";

const feeds: string[] = [
  "https://overreacted.io/rss.xml",
  "https://davidwalsh.name/feed",
  "https://jakearchibald.com/posts.rss",
  "https://www.joshwcomeau.com/rss.xml",
  "https://jvns.ca/atom.xml",
  "https://flaviocopes.com/rss.xml",
  "https://kentcdodds.com/blog/rss.xml",
  "https://blog.maximeheckel.com/rss.xml",
  "https://www.robinwieruch.de/index.xml",
  "https://samwho.dev/rss.xml",
  "https://www.swyx.io/rss.xml",
  "http://www.effectiveengineer.com/atom.xml",
  "https://blog.pragmaticengineer.com/rss/",
  "https://coryrylan.com/feed.xml",
  "https://simpleprogrammer.com/feed/",
];

const parser = new Parser();

export default async function getRSSFeed() {
  const posts: Post[] = [];
  for (const url of feeds) {
    const feed = await parser.parseURL(url);

    for (const item of feed.items) {
      const date = new Date(item.pubDate);
      const today = new Date(); // Get the current date
      const lastWeek = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 7
      );

      const isNewPost = date >= lastWeek;

      if (isNewPost) {
        posts.push({
          blog: feed.title,
          title: item.title,
          href: item.link,
          // post: item["content:encodedSnippet"],
          tags: [],
        });
      }
    }
  }
  return posts.slice(0, 15);
}
