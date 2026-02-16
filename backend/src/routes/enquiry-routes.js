import { Router } from "express";
import {
  getAllEnquiries,
  updateEnquiryStatus,
} from "../controllers/enquiry-controller.js";

import { verifyToken } from "../utils/token-manager.js";

const enquiryRoutes = Router();


// 🔐 GET → Admin gets all | User gets own
enquiryRoutes.get("/", verifyToken, getAllEnquiries);


// 🔐 PATCH → Admin only
enquiryRoutes.patch("/:id", verifyToken, updateEnquiryStatus);


export default enquiryRoutes;
