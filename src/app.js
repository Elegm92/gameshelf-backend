import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import sequelize from './config/database.js';
import './Models/index.js'
import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import gameListRoutes from './routes/gameListRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js';
import likeRoutes from './routes/likeRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173/";

const authLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 minutos
  max: 300, // máximo 10 intentos
  message: { message: "Demasiados intentos, prueba de nuevo en 5 minutos" },
});

//Conexion Back con front
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true, 
  }),
);

app.use(express.json());
app.use(cookieParser());

//rutas api
app.use('/users', userRoutes);
app.use("/games", gameRoutes);
app.use("/auth", authLimiter, authRoutes);
app.use('/gamelist', gameListRoutes);
app.use('/reviews', reviewRoutes);
app.use('/likes', likeRoutes);

app.get('/', (req, res) => {
  res.json({ message: "GameShelf API is running" });
});

sequelize.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error conectando la base de datos:', err));
sequelize
  .sync({ alter: true })
  .then(() => console.log("Tablas sincronizadas"))
  .catch((err) => console.error("Error sincronizando tablas:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));