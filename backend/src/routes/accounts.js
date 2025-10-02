import { Router } from "express";
import { Account, User } from "../db/db";  // ✅ include User
import { authMiddleware } from "../middleware/middleware";
import mongoose from "mongoose";

export const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({ userId: req.userId });

        if (account) {
            res.status(200).json({ balance: account.balance });
        } else {
            res.status(404).json({ msg: "Account doesn't exist" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
});


accountRouter.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    const { amount, to } = req.body; // 'to' = recipient username

    try {
        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        // Find recipient user by username
        const recipientUser = await User.findOne({ username: to }).session(session);
        if (!recipientUser) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient user not found" });
        }

        // Prevent sending to self
        if (recipientUser._id.equals(req.userId)) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Cannot transfer to yourself" });
        }

        const recipientAccount = await Account.findOne({ userId: recipientUser._id }).session(session);
        if (!recipientAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Recipient account not found" });
        }

        // Perform transfer
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: recipientUser._id }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        return res.json({ message: "Transfer successful" });

    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Something went wrong", error: error.message });
    } finally {
        session.endSession();
    }
});


