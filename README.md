# Background Removal Website

Welcome to the **Bg.Remove**! This project is a seamless tool for removing image backgrounds, built using modern web technologies and offering a smooth user experience.

## Features

- **User Authentication**: Secure login and account management powered by [Clerk](https://clerk.dev/).
- **Background Removal**: Utilize an external API to remove image backgrounds effortlessly.
- **Payment Integration**: Purchase credits via [Razorpay](https://razorpay.com/) for using the background removal service.
- **Credits System**: Deduct credits for each background removal operation.

## Live Demo

Check out the live website: [Background Removal Website](https://bg-remove-one.vercel.app/)

## Tech Stack

### Frontend
- **React** (with Vite): For building a fast and interactive user interface.
- **Tailwind CSS**: For modern and responsive design.

### Backend
- **Node.js**: JavaScript runtime for the server-side logic.
- **Express**: Framework for building RESTful APIs.

### Database
- **MongoDB Atlas**: For storing user data, credit balances, and usage history.

### Additional Tools
- **Razorpay**: For integrating secure payments.
- **Clerk**: For managing user authentication and accounts.

## Installation

Follow these steps to run the project locally:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/cloud/atlas)
- [Vite](https://vitejs.dev/)

### Backend Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add:
   ```env
   PORT=4000
   MONGODB_URI=<your-mongodb-atlas-connection-string>
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
   CLERK_WEBHOOK_SECRET = =<your-clerk-webhook-secret>
   CLIPDROP_API=<your-clipdrop-api-key>
   CURRENCY = <your-currency>
   ```
4. Start the backend server:
   ```bash
   npm run server
   ```

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `client` directory and add:
   ```env
   VITE_BACKEND_URL=http://localhost:4000
   VITE_CLERK_PUBLISHABLE_KEYI=<your-clerk-key>
   VITE_RAZORPAY_KEY_ID=<your-razorpay-key>
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Access the Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`


## Usage

1. **Sign Up/Login**: Create an account or log in using Clerk.
2. **Upload Image**: Upload an image.
3. **Remove Background**: Use credits to remove the background of uploaded images.
4. **Purchase Credits**: Use Razorpay to add more credits to your account.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## Acknowledgments

- [CLIPDROPAPI](https://clipdrop.co/) for providing the background removal API.
- [Razorpay](https://razorpay.com/) for payment gateway integration.
- [Clerk](https://clerk.dev/) for authentication.

---

For any inquiries or feedback, please contact!
