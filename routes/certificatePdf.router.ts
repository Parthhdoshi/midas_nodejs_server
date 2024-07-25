import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { generateCertificate } from "../controllers/certificate.controller";
const certificateRouter = express.Router();


certificateRouter.get("/get-certificate",generateCertificate);

certificateRouter.get("/get-certificate/:id", isAuthenticated,authorizeRoles("admin"));

export default certificateRouter;