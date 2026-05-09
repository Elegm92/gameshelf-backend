import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. comprobar si existe header
    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // 2. formato esperado TOKEN
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid token format",
      });
    }

    // 3. verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. guardar usuario en request
    req.user = decoded;

    // 5. continuar
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};