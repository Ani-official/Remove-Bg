import jwt from 'jsonwebtoken'

// Middleware Function to decode jwt token to get clerkId
const authUser = async (req, res, next) => {
    
    try {
        
        const {token} = req.headers

        if (!token) {
            res.json({success:false, message:"Not Authorized Login Again"})
        } 

        const token_decode = jwt.decode(token)
        req.body.clerkId = jwt.decode.clerkId
        next()


    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message})
    }

}

export default authUser