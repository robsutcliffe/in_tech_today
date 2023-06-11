import Link from "next/link";
import { Container } from "@components";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function PostCard({ post }) {
  return (
    <article aria-labelledby={`post-${post.id}`} className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-col items-start">
          <h3 className="order-first font-mono text-sm leading-7 text-slate-500">
            {post.blog}
          </h3>
          <h2
            id={`episode-${post.id}-title`}
            className="mb-2 text-lg font-bold text-slate-900"
          >
            <Link href={post.href} target="_blank">
              {post.title}
            </Link>
          </h2>
          <ul className="mt-1 text-base leading-7 text-slate-700">
            {post.summary.map((point, key) => (
              <li key={key} className="mb-2">
                <SparklesIcon className="w-8 h-8 -ml-7 -mt-2 text-emerald-400 flex-shrink-0 absolute border border-emerald-100 rounded-full p-1 -z-10" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
