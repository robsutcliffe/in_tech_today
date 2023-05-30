import {getPostsByDate} from "../../services/post.service";
import { Post } from "../../models/post.model";
export default async function handler(req, res) {
    const defaultDate: string = new Date().toISOString().split('T')[0];
    const posts: Post[] = await getPostsByDate(defaultDate)
    res.status(200).json({ posts });
}