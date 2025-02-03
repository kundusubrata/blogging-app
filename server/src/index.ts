import express from "express";
import "dotenv/config";
import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes"
import cookieParser from "cookie-parser";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware";

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(cookieParser());



// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);



// Error Handling Middleware
app.use(globalErrorMiddleware);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
