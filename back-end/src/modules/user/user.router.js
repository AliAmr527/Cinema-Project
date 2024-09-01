import { Router } from "express";
import * as UC from "./user.controller.js"
import { asyncHandler } from "../../utils/globalErrorHandling.js";
const router = Router()

router.post("/sign-up",asyncHandler(UC.signup))
router.post("/sign-in",asyncHandler(UC.signin))
router.post("/verify-email",asyncHandler(UC.verifyEmail))

export default router