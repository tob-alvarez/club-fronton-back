import jwt from "jsonwebtoken";

export function verificarToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No autorizado, token faltante" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuarioId = decoded.userId; // guardar userId en req para usar luego
    next(); // seguir al siguiente middleware o controlador
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
