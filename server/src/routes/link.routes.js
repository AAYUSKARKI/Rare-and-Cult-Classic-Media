import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  addLink,
  getLinks,
  deleteLink,
  updateLink,
} from "../controller/link.controller.js";

const router = express.Router();

router.post("/add", authMiddleware, addLink);
router.get("/", getLinks);
router.delete("/:id", authMiddleware, deleteLink);
router.put("/:id", authMiddleware, updateLink);

export default router;