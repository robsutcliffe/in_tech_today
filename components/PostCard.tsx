import Link from "next/link";
import { Container, BulletPoints, Tag } from "@components";
import isToday from "@utils/isToday";
import { Post } from "@models/post.model";

type PostCardType = {
  post: Post;
};

export default function PostCard({ post }: PostCardType) {
  const isNew = isToday(post.created_at);

  return (
    <article aria-labelledby={`post-${post.id}`} className="py-10 sm:py-12">
      <Container>
        <div className="flex flex-col items-start">
          <div className="flex flex-col lg:flex-row justify-between w-full gap-2 mb-2">
            <h3 className="font-mono text-sm grow leading-7 text-slate-500">
              {post.blog}
            </h3>
            <div className="flex flex-row gap-2">
              {post.tags.map(
                (tag, key) =>
                  tag && <Tag key={`${post.id}-${key}`} text={tag} />
              )}
              {isNew && <Tag isNew={true} text="New" />}
            </div>
          </div>
          <h2
            id={`episode-${post.id}-title`}
            className="mb-2 text-lg font-bold text-slate-800 hover:text-yellow-500"
          >
            <Link href={post.href} target="_blank">
              {post.title}
            </Link>
          </h2>
          <BulletPoints points={post.summary} />
          <div className="mt-4 flex items-center gap-4">
            <a
              href={post.href}
              target="_blank"
              className="
                flex
                font-mono
                items-center
                text-sm
                font-bold
                leading-5
                text-slate-700
                hover:text-yellow-500
                active:text-yellow-500
                cursor-pointer"
            >
              Read Full Article
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}
