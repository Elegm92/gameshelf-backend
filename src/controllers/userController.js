// src/controllers/userController.js
import { User } from '../models/index.js';

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] }
    });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    
    const { username, bio } = req.body;
    const avatar = req.file ? req.file.path : user.avatar;
    await user.update({ username, avatar, bio });
    res.json({ message: 'Usuario actualizado correctamente', id: user.id, username: user.username, avatar: user.avatar, bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

export { getAllUsers, getUserById, updateUser };