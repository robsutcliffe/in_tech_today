import puppeteer from "puppeteer-core";
import axios from "axios";
import cheerio from "cheerio";
import { Post } from "@models/post.model";

type Tab = "popular" | "discussed" | "upvoted";

export default async function getPostsFromAppDev(tab: Tab = "popular") {
  try {
    // required browserless token
    // current issue running chrome on vercel
    const browser = await puppeteer.connect({
      browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
    });
    const page = await browser.newPage();

    const url = {
      popular: "https://app.daily.dev/popular",
      discussed: "https://app.daily.dev/discussed",
      upvoted: "https://app.daily.dev/upvoted",
    }[tab];

    await page.goto(url);
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

      const isChangelog = url?.includes("https://changelog.daily.dev");

      if (title && url && blog && !isChangelog) {
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
