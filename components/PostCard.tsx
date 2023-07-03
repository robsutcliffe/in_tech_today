import Link from "next/link";
import { Container, BulletPoints, Tag } from "@components";
import isToday from "@utils/isToday";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
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
          <div className="flex flex-col lg:flex-row justify-between w-full gap-2 mb-1">
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
            className="mb-2 text-lg font-bold text-slate-900 hover:text-yellow-500"
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
                items-center
                text-sm
                font-bold
                leading-6
                text-black
                hover:text-yellow-500
                active:text-yellow-500
                cursor-pointer"
            >
              READ FULL ARTICLE
              <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1 -mt-0.5" />
            </a>
          </div>
        </div>
      </Container>
    </article>
  );
}
