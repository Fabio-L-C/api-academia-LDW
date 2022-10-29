import express from "express";
import {
  createGrupoMuscular,
  updateGrupoMuscular,
  deleteGrupoMuscular,
  getGrupoMuscular,
  getGrupoMusculares,
} from "../controllers/GrupoMuscularController.js";
const router = express.Router();
router.post("/", createGrupoMuscular);
router.put("/:id", updateGrupoMuscular);
router.delete("/:id", deleteGrupoMuscular);
router.get("/:id", getGrupoMuscular);
router.get("/", getGrupoMusculares);
export default router;
