import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    subTitle: String,
    message: String,
    content: String,
    tag: String,
    image: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

const Post = mongoose.model("Post", postSchema);

export default Post;