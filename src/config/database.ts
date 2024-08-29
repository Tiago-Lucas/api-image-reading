import dotenv from 'dotenv'
import mongoose from "mongoose";
import app from "../app"

dotenv.config()

const PORT = process.env.PORT || 3200
const MONGO_URI = process.env.MONGO_URI || ''

mongoose.connect(MONGO_URI, {

}).then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {

    })
}).catch((error) => {
    console.error('Database connection error', error)
})