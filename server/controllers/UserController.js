import { Webhook } from "svix";
import userModel from '../models/userModel.js'

// API Controller function to manage clerk user with database
// http://localhost:4000/api/user/webhooks

const clerkWebhooks = async (req, res) => {

    try {
        // create asvix instance with clerk webhook secret
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers['svix-id'],
            "svix-signature": req.headers['svix-signature'],
            "svix-timestamp": req.headers['svix-timestamp'],
        })

        const { data, type } = req.body

        switch (type) {
            case "user.created": {

                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,

                }
                await userModel.create(userData)
                res.json({})


                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,

                }
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData)
                res.json({})

                break;
            }
            case "user.deleted": {

                await userModel.findOneAndDelete({ clerkId: data.id })
                res.json([])

                break;
            }

            default:
                break;
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }

}



// API controller function to get user availiable credits data


const userCredits = async (req, res) => {
    try {

        
        const { clerkId } = req.body;
        console.log(clerkId)

        // Check if clerkId is provided
        if (!clerkId) {
            return res.status(400).json({ success: false, message: "Clerk ID is required" });
        }

        // Find user by clerkId
        const userData = await userModel.findOne({ clerkId });

        // Check if user was found
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Send the response with user credits
        return res.json({ success: true, credits: userData.creditBalance });

    } catch (error) {
        console.error(error.message);
        
        // Ensure the response is not sent if headers are already sent
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: "Server error" });
        }
    }
};



export { clerkWebhooks, userCredits };


