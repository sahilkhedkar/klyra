import express from 'express'
import dotenv from 'dotenv'

app.use(express.json());
app.use(cors())

import { userRouter } from './routes/user'
import './db/db'
import cors from 'cors'
import { accountRouter } from './routes/accounts';

dotenv.config({
    path: '.env'
})


const app = express();

const PORT = process.env.PORT || 8000

app.use("/api/v1/user" , userRouter)
app.use("/api/v1/account" , accountRouter)

app.listen(PORT , () => {
    console.log(`App is listening on Port ${PORT}`);
})
