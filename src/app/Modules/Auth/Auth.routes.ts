import {Router} from "express"
import { AuthControllers } from "./Auth.controller";
const router = Router();

router.post("/login", AuthControllers.LoginUser)
router.post("/register", AuthControllers.RegisterUser)
router.post("/find-user", AuthControllers.FindUser)

export const AuthRoutes = router;