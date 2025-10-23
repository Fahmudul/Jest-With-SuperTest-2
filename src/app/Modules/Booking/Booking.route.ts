import { Router } from "express";
import { BookingControllers } from "./Booking.Controller";
const router = Router();

router.post("/create-booking-request", BookingControllers.CreateBookingRequest);
router.patch("/accept-booking-request/:id", BookingControllers.AcceptBookingRequest);
router.get("/:teacherId", BookingControllers.GetAllBooking);
router.get("/student/:id", BookingControllers.GetSingleBooking);
// router.get("/:id", SubjectControllers.GetSingleSubject);

export const BookingRoutes = router;
