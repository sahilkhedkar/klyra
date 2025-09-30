import jwt from "jsonwebtoken"

export const authMiddleware = async(req,res,next) => {
    const token = await req.headers.token;

    if(!token) {
        res.status(403).json({
            msg: "token not provided"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.userId = decoded.userId
        next();
    } catch (error) {
        return res.status(403).json({
            msg: "invalid credentilas",
            error: error
        })
    }
}