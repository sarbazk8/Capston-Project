const Postdata = require("../models/postdata")
const mongoose = require("mongoose")

const getPosts = async(req,res)=>{
    const posts = await Postdata.find({}).sort({createdAt: -1})
    res.status(200).json(posts)
};

const createPost = async(req,res)=>{
    const {carname,cardiscription,review}=req.body;
    try{
        const post = await Postdata.create({
            carname,
            cardiscription,
            review
        });
        res.status(200).json('Post added');
    }catch(error){
        console.log("error while making Post" , error)
    }
};

const getPost= async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not valid"});
    }
    const post = await Postdata.findById(id);
    if(!post){
        return res.status(404).json({error: " No such Post"});
    }
    res.status(200).json(post);
};

const deletePost = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not Valid"});
    }
    const post = await Postdata.findOneAndDelete({_id: id});

    if(!post){
        return res.status(404).json({error: "No Such Post"});
    }

    res.status(200).json('Post Deleted Successfully');
};

const updatePost = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not Valid"});
    }
    const post = await Postdata.findOneAndUpdate(
        {_id: id },
        {
            ...req.body,
        }
    );
    if(!post){
        return res.status(404).json({error: "No such Post"});
    }

    res.status(200).json('Post Updated Successfully');
};

module.exports = {
    getPosts,
    createPost,
    getPost,
    deletePost,
    updatePost
}