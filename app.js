import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GameShelf API funcionando' });
});

sequelize.authenticate()
  .then(() => console.log('Base de datos conectada'))
  .catch(err => console.error('Error conectando la base de datos:', err));

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));