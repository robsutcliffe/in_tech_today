import Link from "next/link";
import { Container, FormatedDate } from "@components";

export default function PostCard({ post }) {
  return (
    <article aria-labelledby={`post-${post.id}`} className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-col items-start">
          <FormatedDate
            date={new Date(post.updated_at)}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />
          <h2
            id={`episode-${post.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <Link href={post.href} target="_blank">
              {post.title}
            </Link>
          </h2>
          <ul className="mt-1 text-base leading-7 text-slate-700">
            {post.summary.map((point, key) => (
              <li key={key}>{point}</li>
            ))}
          </ul>
        </div>
      </Container>
    </article>
  );
}
