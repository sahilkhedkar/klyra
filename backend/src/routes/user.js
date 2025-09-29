import { Router } from "express";
import z from 'zod';
import jwt from "jsonwebtoken"
import { User } from "../db/db";
import bcrypt from "bcrypt"

export const userRouter = Router();

userRouter.post("/signup" , async (req,res) => {
    const requiredBody = z.object({
        username: z.string().min(3).max(30),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

    const parsedDatawithSuccess = requiredBody.safeParse(req.body)

    if(!parsedDatawithSuccess.success) {
        res.json({
            msg: "Incorrect Format",
            error: parsedDatawithSuccess.error
        })
        return
    }

    const {username , password , firstName , lastName} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })
    res.status(200).json({
        msg: "SignedUp suceesfully"
    })
})

userRouter.post("/signin" , async (req,res) => {

    const {username , password} = req.body;

    const response = User.findOne({
        username
    })

    if(!response) {
        res.json({
            msg: "User Doesn't exists"
        })
    }

    const passwordMatch = await bcrypt.compare(password , response.password)

    if(passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        },process.env.JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            msg : "Incorrect Creds"
        })
    }
})