import { SparklesIcon } from "@heroicons/react/24/solid";

export default function BulletPoints({ points, searchTerm }) {
  const regex = new RegExp(searchTerm, "gi");

  return (
    <ul className="mt-1 text-base leading-7 text-slate-700">
      {points.map((point, key) => (
        <li key={key} className="mb-2">
          <SparklesIcon
            className="
                  w-8
                  h-8
                  -ml-7
                  -mt-2
                  text-emerald-400
                  flex-shrink-0
                  absolute
                  border-2
                  border-dotted
                  border-emerald-100
                  rounded-full
                  p-1 -
                  -z-10"
          />
          <span
            dangerouslySetInnerHTML={{
              __html: point.replace(
                regex,
                (match) => `<span style="background:#d1fae4;">${match}</span>`
              ),
            }}
          />
        </li>
      ))}
    </ul>
  );
}
