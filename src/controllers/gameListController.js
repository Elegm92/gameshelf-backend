import { GameList } from "../models/index.js";

const validStatus = [
  "playing",
  "completed",
  "pending",
  "abandoned",
  "wishlist",
];

const addGameToList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rawgId, status } = req.body;

    if (!rawgId || isNaN(Number(rawgId))) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    if (!status || !validStatus.includes(status)) {
      return res
        .status(400).json({
          message:
            "Invalid status. Must be one of: playing, completed, pending, abandoned, wishlist",
        });
    }

    const existingGame = await GameList.findOne({ where: { userId, rawgId } });

    if (existingGame) {
      await existingGame.update({ status });
      return res.json({
        message: "Estado del juego actualizado",
        gameList: existingGame,
      });
    }

    const gameList = await GameList.create({ userId, rawgId, status });
    res.status(201).json({ message: "Juego añadido a la lista", gameList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el juego a la lista" });
  }
};

const getUserList = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const gameList = await GameList.findAll({
      where: { userId },
    });

    res.json(gameList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la lista del usuario" });
  }
};

const removeGameFromList = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rawgId } = req.params;

    if (!rawgId || isNaN(Number(rawgId))) {
      return res.status(400).json({ message: "Invalid game ID" });
    }

    const game = await GameList.findOne({ where: { userId, rawgId } });

    if (!game) {
      return res.status(404).json({ message: "El juego no está en la lista" });
    }

    await game.destroy();
    res.json({ message: "Juego eliminado de la lista" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el juego de la lista" });
  }
};

export { addGameToList, getUserList, removeGameFromList };
