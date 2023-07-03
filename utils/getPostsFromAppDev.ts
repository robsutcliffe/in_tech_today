import puppeteer from "puppeteer-core";
import axios from "axios";
import cheerio from "cheerio";
import { Post } from "@models/post.model";

export default async function getPostsFromAppDev() {
  try {
    // required browserless token
    // current issue running chrome on vercel
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
    });
    const page = await browser.newPage();
    await page.goto("https://app.daily.dev/discussed");
    await new Promise((r) => setTimeout(r, 1000));
    const html = await page.content();

    const $ = cheerio.load(html);

    const postRow = $("article");
    const posts: Post[] = [];
    for (let i = 0; i < postRow.length; i++) {
      const el = postRow[i];
      let blog = $(el).find("div > a").attr("aria-label");
      let url = $(el).find("span > a").attr("href");
      let title = $(el).find("h3").text();

      if (title && url && blog) {
        const response = await axios.get(url, { maxRedirects: 5 });
        const href = response.request.res.responseUrl;
        posts.push({ blog, title, href, tags: [] });
      }
    }

    return posts.slice(0, 10);
  } catch (error) {
    throw { error: error.message };
  }
}
