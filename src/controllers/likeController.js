import { Like } from "../models/index.js";

const getReviewLikes = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if(!reviewId || isNaN(Number(reviewId))){
        return res.status(400).json({message: 'Invalid reviw ID'})
    }
    const likes = await Like.findAll({where: { reviewId }})
    res.json(likes)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Error al mostrar los Likes'})
  }
};

const addLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.body;

    if (!reviewId || isNaN(Number(reviewId))) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const existingLike = await Like.findOne({ where: { userId, reviewId } });
    if (existingLike) {
      return res.status(400).json({ message: "Ya has dado like a esta reseña" });
    }

    const like = await Like.create({ userId, reviewId });
    res.status(201).json({ message: "Like añadido", like });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al añadir el like" });
  }
};

const removeLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { reviewId } = req.params;
  
    if (!reviewId || isNaN(Number(reviewId))) {
      return res.status(400).json({ message: "Invalid review ID" });
    }

    const existingLike = await Like.findOne({ where: { userId, reviewId } });
    if (!existingLike) {
      return res.status(404).json({ message: "No has dado like a esta review" });
    }
    await existingLike.destroy();
    res.status(200).json({ message: "Like eliminado" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el like" });
  }
};

export { getReviewLikes, addLike, removeLike };
