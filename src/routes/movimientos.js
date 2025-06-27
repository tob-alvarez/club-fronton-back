import express from "express";
import {
  actualizarMovimiento,
  crearMovimiento,
  eliminarMovimiento,
  listarMovimientos,
  listarMovimientosHistorico,
} from "../controllers/movimientoController.js";
import { verificarToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verificarToken, crearMovimiento);
router.get("/", verificarToken, listarMovimientos);
router.get("/historico", verificarToken, listarMovimientosHistorico);
router.put("/:id", verificarToken, actualizarMovimiento);
router.delete("/:id", verificarToken, eliminarMovimiento);


export default router;
