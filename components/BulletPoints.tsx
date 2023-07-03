import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

export default function BulletPoints({ points }) {
  const { searchTerm } = useContext(PostsContext);
  const regex = new RegExp(searchTerm, "gi");

  return (
    <ul className="mt-1 text-base leading-7 text-slate-700">
      {points.map((point, key) => (
        <li key={key} className="mb-2">
          <div
            className="
            w-4
            h-4
            -ml-6
            flex-shrink-0
            absolute
            border-4
            border-yellow-400
            rounded-full
            mt-1.5"
          />

          <span
            dangerouslySetInnerHTML={{
              __html: point.replace(
                regex,
                (match) =>
                  `<span style="background:#fef08a;color:#000;">${match}</span>`
              ),
            }}
          />
        </li>
      ))}
    </ul>
  );
}
