import express from "express";
import { getUserSidebar } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const  router = express.Router();

router.get('/',protectRoute ,(getUserSidebar));

export default router;