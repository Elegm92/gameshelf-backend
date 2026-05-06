import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'GameShelf API funcionando' });
});

app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));