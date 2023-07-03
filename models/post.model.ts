import isValidUrl from "../utils/isValidUrl";

export type Post = {
  id?: number;
  title: string;
  blog: string;
  href: string;
  tags: string[];
  summary?: string[];
  created_at?: string;
  updated_at?: string;
};

export function isValidPost(post: unknown): post is Post {
  if (typeof post === "object" && post !== null) {
    const { href, blog, tags, title, summary } = post as Post;
    if (typeof href !== "string" || !isValidUrl(href)) {
      console.log("invalid href: ", post);
      return false;
    }

    if (typeof blog !== "string") {
      console.log("invalid blog: ", post);
      return false;
    }

    if (typeof title !== "string") {
      console.log("invalid title: ", post);
      return false;
    }

    if (typeof tags !== "object") {
      console.log("invalid tags: ", post);
      return false;
    }

    if (typeof summary !== "object") {
      console.log("invalid summary: ", post);
      return false;
    }

    return true;
  }
  return false;
}
