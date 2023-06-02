import Head from 'next/head'

import { Container } from '../components/Container'
import { FormattedDate } from '../components/FormattedDate'
import { getLastFivePosts } from '../services/post.service'

import { LightBulbIcon } from '@heroicons/react/20/solid'

function PostEntry({ post }) {
  return (
    <article
      aria-labelledby={`post-${post.id}-title`}
      className="py-10 sm:py-12"
    >
      <Container>
        <div className="flex flex-col items-start">
          <h2
            id={`post-${post.id}-title`}
            className="mt-2 text-lg font-bold text-slate-900"
          >
            <a href={post.href} target="_blank" rel="noopener noreferrer">
              {post.title}
            </a>
          </h2>
          <FormattedDate
            date={new Date(post['updated_at'])}
            className="order-first font-mono text-sm leading-7 text-slate-500"
          />

          <ul
            role="list"
            className="-ml-7 mt-4 max-w-xl space-y-1 text-gray-600"
          >
            {post.summary.map((text, idx) => (
              <li
                key={idx}
                className="flex gap-x-2 text-base leading-7 text-slate-700"
              >
                <div className="mt-1 h-5 w-5 flex-none rounded-full bg-red-500/80">
                  <LightBulbIcon
                    className="m-0.5 h-4 w-4 text-red-100"
                    aria-hidden="true"
                  />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center">
                <button
                  type="button"
                  className="text-grey-500 hover:text-grey-700 active:text-grey-900 flex items-center text-sm font-bold leading-6"
                >
                  <span aria-hidden="true">{tag}</span>
                </button>
                {post.tags.length - 1 !== idx && (
                  <span
                    aria-hidden="true"
                    className="mx-4 text-sm font-bold text-gray-300"
                  >
                    /
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </article>
  )
}

export default function Home(props) {
  const posts = JSON.parse(props.posts)
  return (
    <>
      <Head>
        <title>
          Their Side - Conversations with the most tragically misunderstood
          people of our time
        </title>
        <meta
          name="description"
          content="Conversations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">Posts</h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {posts.map((post) => (
            <PostEntry key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const posts = JSON.stringify(await getLastFivePosts())

  return {
    props: {
      posts,
    },
    revalidate: 10,
  }
}
