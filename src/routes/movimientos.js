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

router.post("/", crearMovimiento);
router.get("/", listarMovimientos);
router.get("/historico", listarMovimientosHistorico);
router.put("/:id", actualizarMovimiento);
router.delete("/:id", eliminarMovimiento);


export default router;
