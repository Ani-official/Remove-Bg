import jwt from 'jsonwebtoken'

// Middleware Function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
        }

        // Decode the token
        const token_decode = jwt.decode(token);

        if (!token_decode || !token_decode.clerkId) {
            return res.status(401).json({ success: false, message: "Invalid token or clerkId missing" });
        }

        // Attach the clerkId to the request body
        req.body.clerkId = token_decode.clerkId;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export default authUser;
