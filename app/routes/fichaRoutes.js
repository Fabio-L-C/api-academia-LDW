import express from "express";
import { verificarAdmin, verificarToken, verificarUsuario } from "../utils/verificarToken.js";
import {
  createFicha,
  updateFicha,
  deleteFicha,
  getFicha,
  getFichas,
} from "../controllers/fichaController.js";
const router = express.Router();
router.post("/",verificarToken, createFicha);
router.put("/:id",verificarToken, updateFicha);
router.delete("/:id",verificarToken, deleteFicha);
router.get("/:id",verificarToken, getFicha);
router.get("/",verificarToken, getFicha);
export default router;
