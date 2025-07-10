import { Router } from "express";
import { getData } from "../controllers/student.controller";

const router = Router();

// define route api ==> route.METHOD("/path", controllerFunction)
router.get("/", getData);

export default router;
