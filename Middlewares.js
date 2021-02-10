import User from "./Models/userModel.js"

export const isAuth = async (req,res,next) => {
    const user = await User.findOne({where: {id:1}});
    req.user = user;
    next();
}

