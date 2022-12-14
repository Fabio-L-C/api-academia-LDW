import express from "express";
import { verificarAtivo } from "../utils/verificarToken.js";
import {
  createAluno,
  updateAluno,
  deleteAluno,
  getAluno,
  getAlunos,
  getAlunosAtivos,
} from "../controllers/AlunoController.js";
const router = express.Router();
router.get("/ativos", verificarAtivo, getAlunosAtivos);
router.post("/", createAluno);
router.put("/:id", updateAluno);
router.delete("/:id", deleteAluno);
router.get("/:id", getAluno);
router.get("/", getAlunos);
export default router;
