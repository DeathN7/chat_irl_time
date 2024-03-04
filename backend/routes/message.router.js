import express from 'express';
import { sendMessage } from '../controllers/message.controller.js';
import { protectRouter } from '../middleware/protectRouter.js';

const router = express.Router();

router.get('/:id', protectRouter ,getMessage);
router.post('/send/:id', protectRouter ,sendMessage);

export default router;