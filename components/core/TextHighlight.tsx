import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

export default function TextHighlight({ text }) {
  const { searchTerm } = useContext(PostsContext);
  const regex = new RegExp(searchTerm, "gi");

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: text.replace(
          regex,
          (match) =>
            `<span style="background:#fef08a;color:#000;">${match}</span>`
        ),
      }}
    />
  );
}
