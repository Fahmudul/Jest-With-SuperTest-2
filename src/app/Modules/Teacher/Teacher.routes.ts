import { Router } from "express";
import { TeacherControllers } from "./Teacher.controller";
import { AuthGurd } from "../../Middlewares/Auth";
const router = Router();

router.post("/save-availability", TeacherControllers.SaveAvailability);
router.get("/get-teacher-details/:id", TeacherControllers.GetTeacherDetails);
router.get(
  "/get-teacher-details/:email",
  TeacherControllers.GetMeTeacherDetails
);
router.get(
  "/get-teacher-availability/:email",
  TeacherControllers.GetAvailability
);
router.get("/:id", TeacherControllers.getSingleTeacher);
router.get("/get-teacher-calendar/:id", TeacherControllers.getTeacherCalendar);
router.get("/", TeacherControllers.GetAllTeacher);
router.post("/udpate-information", TeacherControllers.UpdateInformation);
router.post("/crete-subject", TeacherControllers.CreateSubject);

export const TeacherRoutes = router;
