import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

// add pre-fix posts to all routes in posts.js file

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello moments api");
});

// const CONNECTION_URL= "mongodb+srv://pruthvi:pruthvi@cluster0.eq1o9.mongodb.net/myFirstDatabase"
const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected!!"))
  .catch((e) => console.log(e));

app.listen(PORT, () => console.log(`Server running on Posrt: ${PORT}`));
