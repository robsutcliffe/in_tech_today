import clsx from "clsx";
import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

type TagType = {
  text: string;
  isNew?: boolean;
};
export default function Tag({ text, isNew = false }: TagType) {
  const { searchTerm } = useContext(PostsContext);
  return (
    <span
      className={clsx(
        `
        inline-flex
        items-center
        rounded
        leading-7
        px-3
        text-xs
        font-medium
        font-mono
        tracking-wider
      `,
        isNew || searchTerm?.toLowerCase() === text?.toLowerCase()
          ? "bg-yellow-300 text-black"
          : "bg-slate-100 text-slate-800"
      )}
    >
      {text}
    </span>
  );
}
