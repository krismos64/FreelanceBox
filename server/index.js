import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import clientsRoutes from "./routes/clients.js";
import documentsRoutes from "./routes/documents.js";
import settingsRoutes from "./routes/settings.js";
import eventsRoutes from "./routes/events.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Authorization"],
  optionsSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "votre_secret_de_session",
    resave: false,
    saveUninitialized: false,
    name: "sessionId",
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
    },
  })
);

app.use((req, res, next) => {
  if (req.session?.userId) {
    req.isAuthenticated = true;
  }
  res.setHeader("Cache-Control", "no-store");
  next();
});

app.use("/api/auth", authRoutes);
app.use("/api/clients", authMiddleware, clientsRoutes);
app.use("/api/documents", authMiddleware, documentsRoutes);
app.use("/api/settings", authMiddleware, settingsRoutes);
app.use("/api/events", authMiddleware, eventsRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
