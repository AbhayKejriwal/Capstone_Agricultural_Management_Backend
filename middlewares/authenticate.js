// Verify JWT from headers
// Decode token, validate, and attach user data to the request object
import { verifyToken } from "../utils/jwt.js";
import { fetchUser } from "../services/auth.services.js";

export const authenticate = async (req, res, next) => {
    const token = req.cookies.auth;

    if(!token){
        return res.status(401).json({error: "No token, Unauthorized"});
    }

    try {
        const decoded = verifyToken(token);
        req.user = { id: decoded.userId, role: decoded.role };
        const user = await fetchUser(req.user.id)
        if(!user){
            return res.status(401).json({ message: "user not found" })
        }
        if(!user.isActive){
            return res.status(401).json({ message: "User is not active" });
        }
        req.userDetails = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token is not valid" });
    }
};