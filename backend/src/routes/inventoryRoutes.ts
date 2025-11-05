// src/routes/equipoRoutes.ts
import { Router } from "express";
import * as equipoController from "../controller/inventoryController";
import { verifyToken, authorize } from "../middleware/authMiddleware"; 
import { validateCreateEquipo, validateEquipoId, validateUpdateEquipo } from "../middleware/validator";

const inventoryRoutes = Router();

inventoryRoutes.get("/",verifyToken, authorize(1), equipoController.getAllEquipos);

inventoryRoutes.get("/:id",verifyToken,validateEquipoId,authorize(1),equipoController.getEquipoById);

inventoryRoutes.post("/", verifyToken,validateCreateEquipo, authorize(1), equipoController.createEquipo);

inventoryRoutes.put("/:id", verifyToken,validateUpdateEquipo, authorize(1), equipoController.updateEquipo);

inventoryRoutes.delete("/:id", verifyToken,validateEquipoId, authorize(1), equipoController.deleteEquipo);

export default inventoryRoutes;
