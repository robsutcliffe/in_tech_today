const { Configuration, OpenAIApi } = require("openai");

export default async function summarizeBlogPost(html: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({
    apiKey,
  });
  const openai = new OpenAIApi(configuration);

  const prompt = `Summarise the following blog post in three bullet points (separate the bullet points with hyphens and put the most important point first. each bullet point should be around 130 character long) and after that add 1-3 tags (maximum 4) for the article separate with a hashtag symbol and use spaces when needed (example tags I'm looking for 'react.js', 'css', 'leadership','accessibility', 'business', 'code review', 'security', 'validation', 'git', 'animation'): ${html}`;

  const completion = await openai.createChatCompletion({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.data.choices[0].message;
}
