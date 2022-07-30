
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import postRoutes from './routes/posts.js';
import userRouter from "./routes/user.js";

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hurray...Server is Working!!!')
  })

app.use('/posts', postRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running Successfully on Port: ${PORT}`)))
  .catch((error) => console.log(`${error} Couldn't Connect to Database!!`));

mongoose.set('useFindAndModify', false);
