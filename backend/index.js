if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongooseConnect')
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    secure: false,
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser())

// API Routes
// http://localhost:3000/
// /api/users
// 	/api/users/user
// 	/api/users/manager
// 	/api/users/admin

// /api/register
// /api/login
// /api/logout

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

connectMongo();

app.listen(port, () => {
    console.log(`Server is listening on : ${port} `);
})