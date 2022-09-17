const express =require("express");
const  upload =require('../utils/upload.js');
const router = express.Router();
const{
    createPost,
    getPosts,
    getPost,
    deletePost,
    updatePost,
}=require("../controllers/postController");

router.get("/",getPosts);

router.post("/",createPost);

router.get("/:id",getPost);

router.delete("/:id",deletePost);

router.patch("/:id",updatePost);

module.exports = router;