import {Router} from "express"
import { Account, Transaction } from "../db/db";
import mongoose from "mongoose";
import { authMiddleware } from "../middleware/middleware";

export const accountRouter = Router()

accountRouter.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});

accountRouter.post("/transfer", authMiddleware, async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const toUserId = new mongoose.Types.ObjectId(to);

    if (toUserId.equals(req.userId)) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Cannot transfer to yourself"
        });
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: toUserId }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: toUserId }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();

    // Save transaction record
    await Transaction.create({
        fromUserId: req.userId,
        toUserId: toUserId,
        amount: amount
    });
res.json({
    message: "Transfer successful"
});
})

accountRouter.get("/history", authMiddleware, async (req, res) => {
const transactions = await Transaction.find({
    $or: [
        { fromUserId: req.userId },
        { toUserId: req.userId }
    ]
}).populate('fromUserId', 'firstName lastName').populate('toUserId', 'firstName lastName').sort({ timestamp: -1 });

res.json({
    transactions: transactions.map(t => ({
        id: t._id,
        amount: t.amount,
        from: `${t.fromUserId.firstName} ${t.fromUserId.lastName}`,
        to: `${t.toUserId.firstName} ${t.toUserId.lastName}`,
        timestamp: t.timestamp,
        type: t.fromUserId._id.toString() === req.userId ? 'sent' : 'received'
    }))
});
});



