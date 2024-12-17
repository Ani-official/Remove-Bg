import { Webhook } from "svix";
import userModel from '../models/userModel.js'
import razorpay from 'razorpay'
import transactionalModel from "../models/transactionModel.js";

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

const razorPayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//API to make payments for credits
const paymentRazorpay = async (req, res) => {

    try {
        const { clerkId, planId } = req.body

        const userData = await userModel.findOne({ clerkId })

        if (!userData || !planId) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 50
                break;

            case 'Advance':
                plan = 'Advance'
                credits = 500
                amount = 200
                break;

            case 'Enterprise':
                plan = 'Enterprise'
                credits = 5000
                amount = 1000
                break;

            default:
                break;
        }

        date = Date.now()

        const transactionData = {
            clerkId,
            plan,
            amount,
            credits,
            date
        }

        const newTransaction = await transactionalModel.create(transactionData)

        const options = {
            amount : amount * 100,
            currency : process.env.CURRENCY,
            receipt: newTransaction._id
        }

        await razorPayInstance.orders.create(options,(error, order)=>{
            if (error) {
                return res.json({success:false, message:error})
            }
            res.json({success:true, order})
        })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const verifyRazorpay = async (req, res) => {
    try {
      const { razorpay_order_id } = req.body;
      const orderInfo = await razorPayInstance.orders.fetch(razorpay_order_id);
  
      if (orderInfo.status === 'paid') {
        const transactionData = await transactionalModel.findById(orderInfo.receipt);
  
        if (transactionData.payment) {
          return res.json({ success: false, message: 'Payment already processed' });
        }
  
        // Adding credits to user data
        const userData = await userModel.findOne({ clerkId: transactionData.clerkId });
        const creditBalance = userData.creditBalance + transactionData.credits;
        await userModel.findByIdAndUpdate(userData._id, { creditBalance });
  
        // Update transaction as paid
        await transactionalModel.findByIdAndUpdate(transactionData._id, { payment: true });
  
        console.log("Payment verified and credits added.");
        return res.json({ success: true, message: "Credits Added Successfully" });
      } else {
        return res.json({ success: false, message: "Payment not completed" });
      }
    } catch (error) {
      console.error("Error in verifyRazorpay:", error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay };


