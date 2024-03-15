import { Container, EventAtEnd, FadeIn, PostCard } from "@components";
import { useContext } from "react";
import { PostsContext } from "@context/posts.context";

export default function Posts() {
  const { loadedPosts, handleLoadMore, hasMorePosts } =
    useContext(PostsContext);

  return (
    <>
      <EventAtEnd onEnd={handleLoadMore}>
        <section className="divide-y-4 divide-slate-50 lg:border-t-4 lg:border-slate-50">
          {loadedPosts?.map((post, postIdx) => (
            <article key={post.href} className="overflow-hidden">
              <FadeIn delay={0.15 * (postIdx % 5)}>
                <PostCard post={post} />
              </FadeIn>
            </article>
          ))}
        </section>
      </EventAtEnd>

      {hasMorePosts && (
        <Container>
          <footer className="my-12 w-full text-gray-700 text-center animate-pulse">
            loading...
          </footer>
        </Container>
      )}
    </>
  );
}
