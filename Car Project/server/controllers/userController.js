const {User , validate }= require("../models/userdata")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


const getUsers = async(req,res)=>{
    const users = await User.find({}).sort({createdAt: -1});
    res.status(200).json(users)
};

const createUser = async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
}

const getUser= async (req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not valid"});
    }
    const user = await User.findById(id);
    if(!user){
        return res.status(404).json({error: " No such User"});
    }
    res.status(200).json(user);
};

const deleteUser = async (req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not Valid"});
    }
    const user = await User.findOneAndDelete({_id: id});

    if(!user){
        return res.status(404).json({error: "No Such User"});
    }

    res.status(200).json('User Deleted Successfully');
};

const updateUser = async(req,res)=>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "ID Not Valid"});
    }
    const user = await User.findOneAndUpdate(
        {_id: id },
        {
            ...req.body,
        }
    );
    if(!user){
        return res.status(404).json({error: "No such User"});
    }

    res.status(200).json('User Updated Successfully');
};

module.exports = {
    getUser,
    createUser,
    getUsers,
    deleteUser,
    updateUser
}