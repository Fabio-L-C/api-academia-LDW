import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDatabase from "./app/config/db.js";

import alunosRoutes from "./app/routes/alunosRoutes.js";
import instrutorRoutes from "./app/routes/instrutorRoutes.js";
import grupoMuscularRoutes from "./app/routes/grupoMuscularRoutes.js";
import tipoExercicioRoutes from "./app/routes/tipoExercicioRoutes.js";
import fichaRoutes from "./app/routes/fichaRoutes.js";
import authRoutes from "./app/routes/authRoutes.js";

import { errorHandling } from "./app/utils/error.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandling);

app.use("/api/alunos", alunosRoutes);
app.use("/api/instrutores", instrutorRoutes);
app.use("/api/gruposmusculares", grupoMuscularRoutes);
app.use("/api/tiposexercicios", tipoExercicioRoutes);
app.use("/api/fichas", fichaRoutes);
app.use("/api/auth", authRoutes);

app.listen(8080, () => {
  connectDatabase();
  console.log("Servidor rodando na porta 8080.");
});
