import mongoose, { Schema } from "mongoose";
const DB_NAME = "paytm"

await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`);

console.log(`Connected to database`);

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            minLength: 3,
            maxLength: 30
        },
        password: {
            type: String,
            required: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            maxLength: 50
        }
    }
)

export const User = mongoose.model("User" , UserSchema)