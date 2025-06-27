import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // opcional, para crear usuarios
router.post("/logout", logout);
router.get("/verify", verificarToken); // opcional, para verificar el token


export default router;
