import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const cookieToken = req.cookies?.accessToken;
    const authHeader = req.headers.authorization;

    // 2. formato esperado TOKEN
    const token = cookieToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);

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

export default verifyToken