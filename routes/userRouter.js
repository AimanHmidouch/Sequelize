import { Router } from "express";
import User from "../Models/userModel.js";

const userRouter = Router();

userRouter.post('/add', async (req, res) =>{
    const user = await User.create({
        name:req.body.name,
        email: req.body.email
    })
    res.send(user);
})

userRouter.get('/:id', async (req,res) =>{
    const user = await User.findOne({where: {id:req.params.id}});
    res.send(user);
})


export default userRouter;