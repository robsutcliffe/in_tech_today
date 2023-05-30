import axios from "axios";
import cheerio from "cheerio";
const includeTags = ["javascript", "web development", "css", "react.js", "node", "typescript", "accessibility (a11y)", "software development", "engineering management"];

export default async function getPosts() {
    const options = {
        method: 'GET',
        url: 'https://scrapingbee.p.rapidapi.com/',
        params: {
            url: 'https://bloggingfordevs.com/trends/',
            render_js: 'true'
        },
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'scrapingbee.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);

        const $ = cheerio.load(response.data);

        const postRow = $("div[id^='blog-rank-']");
        const posts = [];
        for (let i = 0; i < postRow.length; i++) {
            const el = postRow[i];
            let tags = [];
            let keep = true;
            let tagElement = $(el).find('div > a.css-inbofv');

            tagElement.each((idx, tagEl) => {
                const tag = $(tagEl).text().toLowerCase()
                if(!includeTags.includes(tag)) keep = false;
                tags.push(tag);
            })

            if(keep) {
                let blog = $(el).find('div > h3 > a').text();
                let href = $(el).find('div > a.css-1ezvrbm').attr('href');
                let title = $(el).find('div > a.css-1ezvrbm').text();

                posts.push({ tags, blog, title, href });
            }
        }

        return posts;
    } catch (error) {
        throw { error: error.message }
    }
}