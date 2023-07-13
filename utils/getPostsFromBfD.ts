// sadly this site seems to have been left to die :(
import cheerio from "cheerio";
import { Post } from "@models/post.model";
import { openBrowser } from "@utils";
const includeTags: string[] = [
  "javascript",
  "web development",
  "css",
  "react.js",
  "node",
  "typescript",
  "accessibility (a11y)",
  "software development",
  "engineering management",
];

export default async function getPostsFromBfD() {
  try {
    const browser = await openBrowser();
    const page = await browser.newPage();
    await page.goto("https://bloggingfordevs.com/trends/");
    await page.waitForSelector("#blog-rank-0", { visible: true });
    const html = await page.content();

    const $ = cheerio.load(html);

    const postRow = $("div[id^='blog-rank-']");
    const posts: Post[] = [];
    for (let i = 0; i < postRow.length; i++) {
      const el = postRow[i];
      let keep = true;
      let tagElement = $(el).find("div > a.css-inbofv");

      tagElement.each((idx, tagEl) => {
        const tag = $(tagEl).text().toLowerCase();
        if (!includeTags.includes(tag)) keep = false;
      });

      if (keep) {
        let blog = $(el).find("div > h3 > a").text();
        let href = $(el).find("div > a.css-1ezvrbm").attr("href");
        let title = $(el).find("div > a.css-1ezvrbm").text();

        posts.push({ tags: [], blog, title, href });
      }
    }
    return posts.slice(0, 10);
  } catch (error) {
    throw { error: error.message };
  }
}
