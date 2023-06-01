import Head from 'next/head'
import Link from 'next/link'

import { Container } from '../components/Container'
import { FormattedDate } from '../components/FormattedDate'
import {getLastFivePosts} from "../services/post.service";

import { LightBulbIcon } from '@heroicons/react/24/outline'

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
                        <Link href={`/${post.id}`}>{post.title}</Link>
                    </h2>
                    <FormattedDate
                        date={new Date()}
                        className="order-first font-mono text-sm leading-7 text-slate-500"
                    />

                    <ul role="list" className="mt-4 max-w-xl space-y-1 text-gray-600">
                    {post.summary.map((text, idx) =>
                        <li key={idx} className="flex gap-x-2 text-base leading-7 text-slate-700">
                            <div className="h-5 w-5 bg-red-500/90 mt-1 rounded-full flex-none">
                                <LightBulbIcon className="m-0.5 h-4 w-4 text-white" aria-hidden="true" />
                            </div>
                            <span>
                            {text}
                            </span>
                        </li>
                    )}
                    </ul>
                    <div className="mt-4 flex items-center gap-4">
                        <button
                            type="button"
                            className="flex items-center text-sm font-bold leading-6 text-grey-500 hover:text-grey-700 active:text-grey-900"
                        >
                            <span className="ml-3" aria-hidden="true">
                Something
              </span>
                        </button>
                        <span
                            aria-hidden="true"
                            className="text-sm font-bold text-gray-300"
                        >
              /
            </span>

                        <Link
                            href={`${post.href}`}
                            className="flex items-center text-sm font-bold leading-6 text-red-500 hover:text-red-700 active:text-red-900"
                            aria-label={`Original post for ${post.title}`}
                        >
                            Read Original Post
                        </Link>
                    </div>
                </div>
            </Container>
        </article>
    )
}

export default function Home(props) {
    const posts = JSON.parse(props.posts);
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
                    <h1 className="text-2xl font-bold leading-7 text-slate-900">
                        Posts
                    </h1>
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
    const posts = JSON.stringify(await getLastFivePosts());

    return {
        props: {
            posts
        },
        revalidate: 10,
    }
}
