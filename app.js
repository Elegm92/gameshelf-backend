import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import './src/models/index.js'
import userRoutes from './src/routes/userRoute.js';
import gameRoutes from './src/routes/gameRoute.js';
import authRoutes from "./src/routes/authRoutes.js";
import gameListRoutes from './src/routes/gameListRoute.js'
import reviewRoutes from './src/routes/reviewRoute.js';
import likeRoutes from './src/routes/likeRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//rutas api
app.use('/users', userRoutes);
app.use("/games", gameRoutes);
app.use("/auth", authRoutes);
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