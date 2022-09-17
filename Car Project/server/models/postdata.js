const { modelNames } = require("mongoose");
const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        carname:{
            type:String,
            require:true,
        },
        cardiscription:{
            type:String,
            require:true,
        },
        review:{
            type:String,
            require:true,
        },
        img:{
            type:String,
        }
    }
)

module.exports=mongoose.model("Post",postSchema)