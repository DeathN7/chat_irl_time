import bcrypt from 'bcryptjs';
import User from "../models/users.model.js";
import generateTokenAndSetCookies from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try{
        const { fullName, userName, password, confirmPassword, gender} = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({message:"Password don't match"});
        }

        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({error :"User already exists"});
        }

        //hash the password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);
        
        // https://avatar-placeholder.iran.liara.run

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?userName=${userName}`

        const newUser = new User({
            fullName,
            userName,
            password: hashedPassword,
            gender,
            profilePic: (gender === 'male' ? boyProfilePic : girlProfilePic),
        });

        if(newUser){
            generateTokenAndSetCookies(newUser._id, res);
            await newUser.save();
        }

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({message:"Something went wrong"});
}};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({userName});

        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({message:"Invalid username or password"});
        }

        generateTokenAndSetCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            userName: user.userName,
            profilePic: user.profilePic,
        });
        } catch(error){
            console.log("error", error.message);
            res.status(500).json({message:"Something went wrong"});
        }
};

export const logout = (req, res) => {
    try {
        res.cookie('jwt', '',{maxAge: 0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("error", error.message);
        res.status(500).json({message:"Something went wrong"});
    }
};
