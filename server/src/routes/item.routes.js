import { Router } from "express";
import { ItemController } from "../controllers/item.controller.js";
import { validateItem } from "../middlewares/item.middleware.js";

const router = Router();

router.get("/", ItemController.list);
router.post("/", validateItem, ItemController.create);
router.get("/:id", ItemController.get);
router.patch("/:id", validateItem, ItemController.update);
router.delete("/:id", ItemController.remove);

export default router;
