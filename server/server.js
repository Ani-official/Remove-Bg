import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'

// App config 
const PORT = process.env.PORT || 4000
const app = express();
await connectDB()
// API Route 
app.get('/',(req, res) => res.send("API working"))

// Initialize Middlewares
app.use(express.json())
app.use(cors())

app.listen(PORT,()=> 
    console.log(`server running on port ${PORT}`)
) 