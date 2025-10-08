import { customAlphabet } from "nanoid";

const nanoid = customAlphabet(
  "1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  3
);

const generateUrl = (url: string) => {
  try {
    const hostname = new URL(url).hostname;
    const parts = hostname.split(".");
    const mainWord = parts[parts.length - 2].toLowerCase();
    return mainWord + nanoid();
  } catch {
    return nanoid();
  }
};

export default generateUrl;
