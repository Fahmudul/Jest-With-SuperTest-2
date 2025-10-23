import { Router } from "express";
import { PayemntController } from "./Payment.controllers";

const router = Router();

router.post("/create-payment-intent", PayemntController.createCheckOutSession);
router.post("/confirm-payment", PayemntController.ConfirmPayment);
router.get("/:id", PayemntController.getAllPayment);
export const PaymentRoutes = router;

