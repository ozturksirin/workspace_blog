import Express from "express";
import {
    getPosts,
    createPosts,
    getSinglePost,
    deletePost,
    updatePost
} from "../controllers/posts.js";


const router = Express.Router();

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPosts);
router.patch("/:id", updatePost)
router.delete("/:id", deletePost);


export default router;