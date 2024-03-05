import User from "../models/users.model.js";

export const getUserSidebar = async (req, res) => {
    try {
        const loggedinUserID = req.user._id;

        const filteredUser = await User.find({ _id: { $ne: loggedInUserID}})

        res.status(200).json({users: filteredUser});
    } catch (error) {
        console.log("error in user getUserSidebar", error.message);
        res.status(500).json({message:"Something went wrong"});
    }
}