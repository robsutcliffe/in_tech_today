import axios from "axios";
export default async function tldrThis(url) {
  const options = {
    method: "POST",
    url: "https://tldrthis.p.rapidapi.com/v1/model/extractive/summarize-url/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "tldrthis.p.rapidapi.com",
    },
    data: {
      url,
      num_sentences: 2,
      is_detailed: false,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
}
