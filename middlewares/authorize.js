// Check user role and restrict access based on route requirements
export const authorize = (...roles) => {
    return (req, res, next) => {
        if(!req.userDetails){
            return res.status(401).json({message: "Not Authenticated"});
        }

        const userRole = req.userDetails.role;
        if(!roles.includes(userRole)){
            return res.status(403).json({message: "Access Denied: Insufficient Permissions"});
        }
        next();
    };
};