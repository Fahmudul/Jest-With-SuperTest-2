import { Router } from "express";
import { SubjectControllers } from "./Student.Controller";
const router = Router();

router.post("/create-subject", SubjectControllers.CreateSubject);
router.get("/", SubjectControllers.GetAllSubjects);
router.get("/:id", SubjectControllers.GetSingleSubject);

export const StudentRoutes = router;
