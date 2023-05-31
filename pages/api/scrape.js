import getPosts from "../../utils/getPosts";
import tldrThis from "../../utils/tldrThis";
import pLimit from 'p-limit';

import {addPosts, checkPostUrl} from "../../services/post.service";

const limit = pLimit(1);

export default async function handler(req, res) {

    try {
        const rawPosts = await getPosts();
        const newPosts = await rawPosts.filter(checkPostUrl)
        const topFivePosts = await newPosts.slice(0, 5);


        const summarisePromise = await topFivePosts.map(post => {
            return limit(async () => {
                const { summary } = await tldrThis(post.href);
                if(summary) {
                    return {
                        ...post,
                        summary
                    }
                }
            })
        })

        const summarisedPosts = await Promise.all(summarisePromise)

        await addPosts(summarisedPosts)
        res.status(200).json({ done: topFivePosts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}
