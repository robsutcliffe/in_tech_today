import edgeChromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";
const LOCAL_CHROME_EXECUTABLE =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
export default async function openBrowser() {
  const executablePath =
    (await edgeChromium.executablePath) || LOCAL_CHROME_EXECUTABLE;
  return await puppeteer.launch({
    executablePath,
    args: edgeChromium.args,
    headless: true,
  });
}
