import { Review } from '../models/index.js';

const createReview = async (req, res) => {
  try {
    const { userId, rawgId, content, rating } = req.body;

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    if (!rawgId || isNaN(Number(rawgId))) {
      return res.status(400).json({ message: 'Invalid game ID' });
    }

    if (!content || content.trim().length < 10) {
      return res.status(400).json({ message: 'La reseña debe tener al menos 10 caracteres' });
    }

    if (!rating || isNaN(Number(rating)) || rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'La puntuación debe ser un número entre 1 y 10' });
    }

    const existingReview = await Review.findOne({ where: { userId, rawgId } });
    if (existingReview) {
      return res.status(400).json({ message: 'Ya has escrito una reseña para este juego' });
    }

    const review = await Review.create({ userId, rawgId, content, rating });
    res.status(201).json({ message: 'Reseña creada correctamente', review });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reseña' });
  }
};

const getGameReviews = async (req, res) => {
  try {
    const { rawgId } = req.params;

    if (!rawgId || isNaN(Number(rawgId))) {
      return res.status(400).json({ message: 'Invalid game ID' });
    }

    const reviews = await Review.findAll({
      where: { rawgId }
    });

    res.json(reviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reseñas del juego' });
  }
};

const getUserReviews = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId || isNaN(Number(userId))) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const reviews = await Review.findAll({
      where: { userId }
    });

    res.json(reviews);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reseñas del usuario' });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, rating } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    if (!content || content.trim().length < 10) {
      return res.status(400).json({ message: 'La reseña debe tener al menos 10 caracteres' });
    }

    if (!rating || isNaN(Number(rating)) || rating < 1 || rating > 10) {
      return res.status(400).json({ message: 'La puntuación debe ser un número entre 1 y 10' });
    }

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await review.update({ content, rating });
    res.json({ message: 'Reseña actualizada correctamente', review });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la reseña' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ message: 'Invalid review ID' });
    }

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    await review.destroy();
    res.json({ message: 'Reseña eliminada correctamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la reseña' });
  }
};

export { createReview, getGameReviews, getUserReviews, updateReview, deleteReview };