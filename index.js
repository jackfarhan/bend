const express = require ('express');
const connectDB = require('./config/db')
const path = require("path");
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()

const app = express()
connectDB()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', require('./routes/auth'))
app.use('/api/employees',require('./routes/employees'))

const PORT = process.env.PORT || 5000
app.listen(PORT,()=> console.log(`server started on port ${PORT}`))