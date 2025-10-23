import { Router } from "express";
import { AuthRoutes } from "../Modules/Auth/Auth.routes";
import { TeacherRoutes } from "../Modules/Teacher/Teacher.routes";
import { SubjectRoutes } from "../Modules/Subject/Subject.route";
import { BookingRoutes } from "../Modules/Booking/Booking.route";
import { PaymentRoutes } from "../Modules/Payment/Payment.route";

const router = Router();

const applicationRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/teacher",
    route: TeacherRoutes,
  },
  {
    path: "/subject",
    route: SubjectRoutes,
  },
  {
    path: "/booking",
    route: BookingRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
];
applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
