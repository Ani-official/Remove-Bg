import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import index from "toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import axios from "axios";

function BuyCredit() {
  const { backendUrl, loadCreditsData } = useContext(AppContext);

  const navigate = useNavigate();

  const { getToken } = useAuth();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Credits Payment",
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log("Razorpay Payment Response:", response);

        const token = await getToken();

        try {
          // Call backend to verify payment
          const { data } = await axios.post(
            `${backendUrl}/api/user/verify-razor`,
            response,
            { headers: { token } }
          );

          console.log("Payment Verification Response:", data);

          if (data.success) {
            toast.success("Credits Added Successfully");
            loadCreditsData();
            navigate("/"); // Redirect to home
          } else {
            toast.error(data.message || "Payment verification failed.");
          }
        } catch (error) {
          console.error("Error verifying payment:", error.message);
          toast.error("An error occurred. Please try again.");
        }
      },
      modal: {
        ondismiss: () => {
          toast.info("Payment process cancelled.");
        },
      },
    };

    // Initialize and open Razorpay modal
    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", (response) => {
      console.error("Payment Failed:", response.error);
      toast.error("Payment failed. Please try again.");
    });

    rzp.open();
  };

  const paymentRazorpay = async (planId) => {
    try {
      const token = await getToken();

      const { data } = await axios.post(
        `${backendUrl}/api/user/pay-razor`,
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[80vh] text-center pt-14 mb-10">
      <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
        Our Plans
      </button>
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent py-6 md:py-16 ">
        Choose the plan that's right for you
      </h1>

      <div className="flex flex-wrap justify-center gap-6 text-left">
        {plans.map((item, index) => (
          <div
            className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-700 hover:scale-105 transition-all duration-500"
            key={index}
          >
            <img width={40} src={assets.logo_icon} alt="" />
            <p className="mt-3 font-semibold">{item.id}</p>
            <p className="text-sm">{item.desc}</p>
            <p className="mt-6">
              <span className="text-3xl font-medium">${item.price}</span>/
              {item.credits}credits
            </p>
            <button
              onClick={() => paymentRazorpay(item.id)}
              className="w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52
            "
            >
              Purschase
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BuyCredit;
