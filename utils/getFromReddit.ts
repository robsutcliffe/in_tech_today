import axios from "axios";

export default async function getFromReddit() {
  const credentials = {
    username: "saintRobster",
    password: "tT?55x8knde48&fB",
    grant_type: "password",
    client_id: "cdTv_uKzbtT8aITBV7MFhg",
    client_secret: "ewycKXYTvkZsdeNYvLS-IbFQsFFO4Q",
  };

  const cookieRequest = await axios.post(
    "https://www.reddit.com/api/v1/access_token",
    null,
    {
      auth: {
        username: credentials.client_id,
        password: credentials.client_secret,
      },
      params: {
        ...credentials,
      },
    }
  );

  const token = cookieRequest.data.access_token;

  const response = await axios.get(
    `https://oauth.reddit.com/r/dataisbeautiful/top`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": "YOUR_USER_AGENT", // Replace with your Reddit app's user agent.
      },
      params: {
        t: "day", // Get top posts of the day.
        limit: 10, // Limit to 10 posts.
      },
    }
  );

  return response.data;
}
