import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  createOrder,
  createOrderByCoupon,
  getAllOrders,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";
const orderRouter = express.Router();

orderRouter.post("/create-order", isAutheticated, createOrder);
orderRouter.post("/create-order-by-coupon", isAutheticated, createOrderByCoupon);

orderRouter.get(
  "/get-orders",
  isAutheticated,
  authorizeRoles("admin"),
  getAllOrders
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAutheticated, newPayment);

export default orderRouter;
