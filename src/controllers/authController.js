import { User } from "../models/index.js";

const registerUser = async (req, res) => {
    try {
      const { username, email, password } = req.body;

      //validación campos
      if (!username || !email || !password) {
        return res.status(400).json({
          message: "All fields are required",
        });
      }

      // limpiar datos
      const cleanUsername = username.trim();
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password;

      // regex username
      const usernameRegex = /^[a-zA-Z0-9_.-]{3,20}$/;

      if (!usernameRegex.test(cleanUsername)) {
        return res.status(400).json({
          message: "Username must contain only letters, numbers, _, . or -",
        });
      }

      // regex email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      // validar password
      if (cleanPassword.length < 8) {
        return res.status(400).json({
          message: "Password must be at least 8 characters",
        });
      }

      if (cleanPassword.length > 100) {
        return res.status(400).json({
          message: "Password too long",
        });
      }

      // comprobar email existente
      const existingEmail = await User.findOne({
        where: { email: cleanEmail },
      });

      if (existingEmail) {
        return res.status(409).json({
          message: "Email already registered",
        });
      }

      // comprobar username existente
      const existingUsername = await User.findOne({
        where: { username: cleanUsername },
      });

      if (existingUsername) {
        return res.status(409).json({
          message: "Username already taken",
        });
      }

      // crear usuario
      const user = await User.create({
        username: cleanUsername,
        email: cleanEmail,
        password: cleanPassword
      });
      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });

    } catch (error) {
      console.error("registerUser error:", error.message);

      res.status(500).json({
        message: "Failed to register user",
      });
    }
};

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      // validar campos obligatorios
      if (!email || !password) {
        return res.status(400).json({
          message: "Email and password are required",
        });
      }

      //limpiar datos
      const cleanEmail = email.trim().toLowerCase();
      const cleanPassword = password;

      // validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({
          message: "Invalid email format",
        });
      }

      // buscar usuario
      const user = await User.findOne({
        where: { email: cleanEmail },
      });

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      // comparar password
      if (user.password !== cleanPassword) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      });

    } catch (error) {
      console.error("loginUser error:", error.message);

      res.status(500).json({
        message: "Failed to login",
      });
    }
};

export { registerUser, loginUser };
