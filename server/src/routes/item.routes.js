import { Router } from "express";
import { ItemController } from "../controllers/item.controller.js";

const router = Router();

router.get("/", ItemController.list);
router.post("/", ItemController.create);
router.get("/:id", ItemController.get);
router.patch("/:id", ItemController.update);
router.delete("/:id", ItemController.remove);

export default router;
