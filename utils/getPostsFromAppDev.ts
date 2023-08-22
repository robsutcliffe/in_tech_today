import axios from "axios";
import { Post } from "@models/post.model";
import openBrowser from "@utils/openBrowser";

function getSourceBasedOnDayOfMonth() {
  const dayOfMonth = new Date().getDate();
  const position = dayOfMonth % 3 === 0 ? 0 : dayOfMonth % 3;

  return [
    "https://app.daily.dev/popular",
    "https://app.daily.dev/discussed",
    "https://app.daily.dev/upvoted",
  ][position];
}

export default async function getPostsFromAppDev() {
  try {
    const browser = await openBrowser();
    const page = await browser.newPage();

    // const url = getSourceBasedOnDayOfMonth();
    // await page.goto(url);
    // await new Promise((r) => setTimeout(r, 1000));
    // const html = await page.content();
    //
    // const $ = cheerio.load(html);
    //
    // const postRow = $("article");
    const postRow = []

    const posts: Post[] = [];
    for (let i = 0; i < postRow.length; i++) {
      const el = postRow[i];
      let blog = ''//$(el).find("div > a").attr("aria-label");
      let url = ''//$(el).find("span > a").attr("href");
      let title = ''//$(el).find("h3").text();

      const isChangelog = url?.includes("https://changelog.daily.dev");

      if (title && url && blog && !isChangelog) {
        const response = await axios.get(url, { maxRedirects: 5 });
        const href = response.request.res.responseUrl;
        posts.push({ blog, title, href, tags: [] });
      }
    }

    return posts.slice(0, 15);
  } catch (error) {
    throw { error: error.message };
  }
}
