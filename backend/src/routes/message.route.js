import { Router } from "express";
import { createMessage,
    getMessages,
    editMessage,
    deleteMessage,
    likeMessage
 } from "../controllers/message.controller.js";

const router = Router()

router.post("/", createMessage)
router.get("/", getMessages)
router.put("/:id", editMessage)
router.delete("/:id", deleteMessage)
router.post("/:id/like", likeMessage)

export default router; 