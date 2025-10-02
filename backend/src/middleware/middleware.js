import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from headers
    const token = req.headers.token;

    if (!token) {
      return res.status(401).json({ message: "Access Denied: No token provided" });
    }

    // Verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user id to request object
    req.userId = verified.id;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
