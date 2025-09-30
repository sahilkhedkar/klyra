import { Router } from "express";
import z from 'zod';
import jwt from "jsonwebtoken"
import { User } from "../db/db";
import bcrypt from "bcrypt"
import { authMiddleware } from "../middleware/middleware";

export const userRouter = Router();

 const requiredBody = z.object({
        username: z.string().min(3).max(30),
        password: z.string().min(8, "Password must be at least 8 characters long"),
        firstName: z.string().min(3).max(50),
        lastName: z.string().min(3).max(50)
    })

userRouter.post("/signup" , async (req,res) => {

    const parsedDatawithSuccess = requiredBody.safeParse(req.body)

    if(!parsedDatawithSuccess.success) {
        res.json({
            msg: "Incorrect Format",
            error: parsedDatawithSuccess.error
        })
        return
    }

    const {username , password , firstName , lastName} = req.body;

    const existiningUser = User.findOne({
        username
    })

    if(existiningUser) {
        return res.status(411).json({
            msg: "User already exists"
        })
    }

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

userRouter.post("/signin", async (req, res) => {

    const parsedDatawithSuccess = requiredBody.safeParse(req.body)

    if(!parsedDatawithSuccess.success) {
        res.json({
            msg: "Incorrect Format",
            error: parsedDatawithSuccess.error
        })
        return
    }

    const { username, password } = req.body;

    const response = await User.findOne({ username });

    if (!response) {
        return res.status(404).json({
            msg: "User doesn't exist"
        });
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (passwordMatch) {
        const token = jwt.sign(
            { id: response._id.toString() },
            process.env.JWT_SECRET
        );

        return res.json({
            token
        })
    } else {
        return res.status(403).json({
            msg: "Incorrect credentials"
        });
    }
});

userRouter.put('/update' , authMiddleware , async (req,res) => {
  const parsedDatawithSuccess = requiredBody.safeParse(req.body)

    if(!parsedDatawithSuccess.success) {
        res.json({
            msg: "Incorrect Format",
            error: parsedDatawithSuccess.error
        })
        return
    }
    
    const updateUser = await User.updateOne({
        _id: req.userId
    },req.body)

    if(updateUser) {
        return res.status(200).json({
            msg: "Updated Successfully"
        })
    } else {
        return res.status(403).json({
            msg: "Error while updating"
        })
    }


});

userRouter.get("/bulk" , async (req,res) => {
    const filter = req.query.filter || ""

       const users = await User.find({
       $or: [{
            firstName: {
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
       }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})