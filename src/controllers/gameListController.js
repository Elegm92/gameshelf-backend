import { GameList } from '../models/index.js';

const addGameToList = async (req, res) => {
  try {
    const { userId, rawgId, status } = req.body;

    const existingGame = await GameList.findOne({ where: { userId, rawgId } });

    if (existingGame) {
      await existingGame.update({ status });
      return res.json({ message: 'Estado del juego actualizado', gameList: existingGame });
    }

    const gameList = await GameList.create({ userId, rawgId, status });
    res.status(201).json({ message: 'Juego añadido a la lista', gameList });

  } catch (error) {
    res.status(500).json({ message: 'Error al añadir el juego a la lista', error });
  }
};

const getUserList = async (req, res) => {
  try {
    const { userId } = req.params;

    const gameList = await GameList.findAll({
      where: { userId }
    });

    if (!gameList.length) {
      return res.status(404).json({ message: 'El usuario no tiene juegos en su lista' });
    }

    res.json(gameList);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la lista del usuario', error });
  }
};

const removeGameFromList = async (req, res) => {
  try {
    const { userId, rawgId } = req.params;

    const game = await GameList.findOne({ where: { userId, rawgId } });

    if (!game) {
      return res.status(404).json({ message: 'El juego no está en la lista' });
    }

    await game.destroy();
    res.json({ message: 'Juego eliminado de la lista' });

  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el juego de la lista', error });
  }
};

export { addGameToList, getUserList, removeGameFromList };