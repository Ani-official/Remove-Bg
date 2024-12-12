import crypto from 'crypto';
import userModel from '../models/userModel.js';


const clerkWebhooks = async (req, res) => {
    
    try {
        console.log(req.body);

        // Get the webhook secret
        const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

        // Get the signature from the headers
        const signature = req.headers['svix-signature'];

        // Get the timestamp from the headers
        const timestamp = req.headers['svix-timestamp'];

        // Get the svix id from the headers
        const svixId = req.headers['svix-id'];

        // Verify the signature
        const expectedSignature = crypto.createHmac('sha256', webhookSecret)
            .update(`${svixId}${timestamp}${JSON.stringify(req.body)}`)
            .digest('hex');

        if (signature !== expectedSignature) {
            throw new Error('Invalid signature');
        }

        const { data, type } = req.body;

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                try {
                    const user = await userModel.create(userData);
                    console.log(user);
                    res.json({})

                } catch (error) {
                    console.log(error);
                    res.json({ success: false, message: error.message })
                }

                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url,
                }

                try {
                    const user = await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                    console.log(user);
                    res.json({})

                } catch (error) {
                    console.log(error);
                    res.json({ success: false, message: error.message })
                }

                break;
            }
            case "user.deleted": {
                try {
                    const user = await userModel.findOneAndDelete({ clerkId: data.id });
                    console.log(user);
                    res.json([])

                } catch (error) {
                    console.log(error);
                    res.json({ success: false, message: error.message })
                }

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

export { clerkWebhooks }