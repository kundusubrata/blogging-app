import cookieParser from "cookie-parser";
import "dotenv/config";
import express from "express";
import { globalErrorMiddleware } from "./middlewares/globalErrorMiddleware";
import commentRoutes from "./routes/comment.routes";
import likeRoutes from "./routes/like.routes";
import postRoutes from "./routes/post.routes";
import userRoutes from "./routes/user.routes";

const app = express();
const port = process.env.PORT || 7000;

import path from "path";
import { rateLimiter } from "./middlewares/rateLimiter";

app.use(rateLimiter);
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);
app.use("/api/v1", likeRoutes);
app.use("/api/v1", commentRoutes);

// Static Files
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
});

// Error Handling Middleware
app.use(globalErrorMiddleware);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
