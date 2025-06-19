import { Router } from "express";
import { createMessage,
    getMessages,
    editMessage,
    deleteMessage
 } from "../controllers/message.controller.js";

const router = Router()

router.post("/", createMessage)
router.get("/", getMessages)
router.put("/:id", updateMessage)
router.delete("/:id", deleteMessage)

export default router; 