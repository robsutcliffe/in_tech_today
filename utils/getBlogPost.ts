import { extract } from "@extractus/article-extractor";
import { JSDOM } from "jsdom";
export default async function getBlogPost(
  address: string
): Promise<{ html: string; description: string }> {
  return await new Promise(async (resolve) => {
    try {
      const postData = await extract(address);

      const dom = new JSDOM(postData.content);
      const bodyElement = dom.window.document.querySelector("body");

      const allElements = bodyElement.querySelectorAll("code");
      allElements.forEach((element) => {
        element.parentNode.removeChild(element);
      });

      // remove any html elements or entities
      const modifiedHTML = bodyElement.innerHTML
        .replace(/&[^;]+;/g, "")
        .replace(/\n/g, "")
        .replace(/<[^>]+>/g, "");

      resolve({ html: modifiedHTML, description: postData.description });
    } catch (error) {
      resolve({ html: "", description: "" });
    }
  });
}
