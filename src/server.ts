import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/user";
import uploadStorage from "./routes/upload";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/users", userRouter);
app.use("/upload", uploadStorage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API RUNNING ON PORT ${PORT}`);
});
