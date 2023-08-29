import express from "express";
const app = express();
import env from "./utils/envalid";
import postRouter from "./routers/post";
import authRouter from "./routers/auth";
import userRouter from "./routers/user";
import searchRouter from "./routers/search";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { createServer } from "http";
import { Server } from "socket.io";
import User from "./models/user";
import morgan from "morgan"
import xss from "xss";
import mongosanitize from "express-mongo-sanitize"
import helmet from "helmet";
import logger from "./middlewares/logger";

const server = createServer(app);

if (env.DEV) {
  app.use(morgan('dev'));
} else app.use(logger)

app.use(cors({
  origin: "*",
  methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  credentials: true, //
  //   Access-Control-Allow-Credentials is a header that, when set to true , tells browsers to expose the response to the frontend JavaScript code. The credentials consist of cookies, authorization headers, and TLS client certificates.
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(mongosanitize());

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const ONLINE_USER_TO_SOCKET_ID_MAP = new Map<string, string>();

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
  },
});

io.on("connection", (socket) => {
  console.log(`Socket ID "${socket.id}" connected`);
  socket.on("start", ({ userId }) => {
    ONLINE_USER_TO_SOCKET_ID_MAP.set(userId, socket.id);
  });

  socket.on("notify", ({ userId }) => {
    const room = ONLINE_USER_TO_SOCKET_ID_MAP.get(userId);
    socket.to(room!).emit("haveNotifications", true);
  });

  socket.on("checkNotifications", async ({ userId }) => {
    const test = await User.findOne({
      _id: userId,
    });
    let count = 0;
    test?.notifications.forEach((item) => {
      if (!item.read) count++;
    });
    socket.emit("notificationsCount", { count });
  });

  socket.on("readAll", async ({ userId }) => {
    await User.updateOne(
      { _id: userId },
      { $set: { "notifications.$[].read": true } },
      { multi: true }
    );
  });

  socket.on("disconnect", (reason) => {
    console.log(reason, socket.id);
  });
});

app.use("/post", postRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/search", searchRouter);

app.use(errorHandler);

export { server };
