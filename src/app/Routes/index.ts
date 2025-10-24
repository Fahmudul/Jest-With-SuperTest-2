import { Router } from "express";
import { BookRoutes } from "../Modules/book/book.routes";

const router = Router();

const applicationRoutes = [
  {
    path: "/book",
    route: BookRoutes,
  },
];
applicationRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
