import express from 'express'
import dotenv from 'dotenv'
import { userRouter } from './routes/user'
import './db/db'
import cors from 'cors'

dotenv.config({
    path: '.env'
})


const app = express()

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 8000

app.use("/api/v1/user" , userRouter)

app.listen(PORT , () => {
    console.log(`App is listening on Port ${PORT}`);
})
