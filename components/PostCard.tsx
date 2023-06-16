import Link from "next/link";
import { Container } from "@components";
import {
  SparklesIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/solid";

function isToday(date) {
  const date1 = new Date(date);
  const date2 = new Date();
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export default function PostCard({ post }) {
  const isNew = isToday(post.created_at);

  return (
    <article aria-labelledby={`post-${post.id}`} className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-col items-start">
          <div className="flex flex-row justify-between w-full gap-2">
            <h3 className="font-mono text-sm grow leading-7 text-slate-500">
              {post.blog}
            </h3>
            {post.tags.map((tag, key) => (
              <span
                key={key}
                className="
                  inline-flex
                  items-center
                  rounded-md
                  px-2
                  py-1
                  text-xs
                  font-medium
                  text-gray-600
                  ring-1
                  ring-inset
                  ring-gray-500/10"
              >
                {tag}
              </span>
            ))}
            {isNew && (
              <span
                className="
                  inline-flex
                  bg-emerald-100
                  items-center
                  rounded-md
                  px-2
                  py-1
                  text-xs
                  font-medium
                  text-emerald-800
                  ring-1
                  ring-inset
                  ring-emerald-300"
              >
                New
              </span>
            )}
          </div>
          <h2
            id={`episode-${post.id}-title`}
            className="mb-2 text-lg font-bold text-slate-900 hover:text-emerald-600"
          >
            <Link href={post.href} target="_blank">
              {post.title}
            </Link>
          </h2>
          <ul className="mt-1 text-base leading-7 text-slate-700">
            {post.summary.map((point, key) => (
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
                  z-10"
                />
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={post.href}
              target="_blank"
              className="
                flex
                items-center
                text-sm
                font-bold
                leading-6
                text-emerald-500
                hover:text-emerald-700
                active:text-emerald-900
                cursor-pointer"
            >
              Read Article
              <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1 -mt-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}
