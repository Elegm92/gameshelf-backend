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

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });
    const user = await User.create({ username, email, password });
    res.status(201).json({ message: 'Usuario creado correctamente', id: user.id, username: user.username, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    const { username, avatar, bio } = req.body;
    await user.update({ username, avatar, bio });
    res.json({ message: 'Usuario actualizado correctamente', id: user.id, username: user.username, avatar: user.avatar, bio: user.bio });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el usuario', error });
  }
};

export { getAllUsers, getUserById, createUser, updateUser };