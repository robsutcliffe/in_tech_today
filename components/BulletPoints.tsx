import { TextHighlight } from "@components";

export default function BulletPoints({ points }) {
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
          <TextHighlight text={point} />
        </li>
      ))}
    </ul>
  );
}
