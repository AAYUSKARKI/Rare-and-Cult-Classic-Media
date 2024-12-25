import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
addMedia,
getMedia,
deleteMedia,
updateMedia,
} from "../controller/media.controller.js";
const router = express.Router();

router.post("/add", authMiddleware, addMedia);
router.get("/", getMedia);
router.delete("/:id", authMiddleware, deleteMedia);
router.put("/:id", authMiddleware, updateMedia);
export default router;

