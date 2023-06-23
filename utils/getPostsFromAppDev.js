const puppeteer = require("puppeteer");
import axios from "axios";
import cheerio from "cheerio";
export default async function getPostsFromAppDev() {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://app.daily.dev/discussed");
    await new Promise((r) => setTimeout(r, 1000));
    const html = await page.content();

    const $ = cheerio.load(html);

    const postRow = $("article");
    const posts = [];
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
