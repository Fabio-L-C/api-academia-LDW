import express from "express";
import { verificarToken } from "../utils/verificarToken.js";
import {
  createGrupoMuscular,
  updateGrupoMuscular,
  deleteGrupoMuscular,
  getGrupoMuscular,
  getGrupoMusculares,
} from "../controllers/GrupoMuscularController.js";
const router = express.Router();
router.post("/", verificarToken, createGrupoMuscular);
router.put("/:id", verificarToken, updateGrupoMuscular);
router.delete("/:id", verificarToken, deleteGrupoMuscular);
router.get("/:id", verificarToken, getGrupoMuscular);
router.get("/", verificarToken, getGrupoMusculares);
export default router;
