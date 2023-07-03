import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

export default function BulletPoints({ points }) {
  const { searchTerm } = useContext(PostsContext);
  const regex = new RegExp(searchTerm, "gi");

  return (
    <ul className="mt-2 text-base leading-6 text-slate-700">
      {points.map((point, key) => (
        <li key={key} className="mb-2">
          <span
            className="
            w-3
            h-3
            -ml-5
            flex-shrink-0
            absolute
            border-4
            border-yellow-300
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
