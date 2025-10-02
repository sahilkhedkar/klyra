import { Router } from "express";
import z from 'zod';
import jwt from "jsonwebtoken"
import { Account, User } from "../db/db";
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

    const existiningUser = await User.findOne({
        username
    })

    if(existiningUser) {
        return res.status(411).json({
            msg: "User already exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username: username,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName
    })

    const userId = user._id

    //Creating a new Account

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })
    res.status(200).json({
        msg: "SignedUp suceesfully"
    })
})

userRouter.post("/signin", async (req, res) => {

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
            { userId: response._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
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

    if (updateUser.modifiedCount > 0) {
    return res.status(200).json({ msg: "Updated Successfully" });
    } else {
    return res.status(400).json({ msg: "No changes made" });
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

userRouter.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
        return res.status(404).json({ msg: "User not found" });
    }

    res.json({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName
    });
});