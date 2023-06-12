import axios from "axios";
import cheerio from "cheerio";
export default async function getPostsFromAppDev() {
  const options = {
    method: "GET",
    url: "https://scrapingbee.p.rapidapi.com/",
    params: {
      url: "https://app.daily.dev/discussed",
      render_js: "true",
    },
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "scrapingbee.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    const $ = cheerio.load(response.data);

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

    return posts.slice(0, 3);
  } catch (error) {
    throw { error: error.message };
  }
}
