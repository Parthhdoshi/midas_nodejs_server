import express from 'express';
import { createCoupon, getAllCoupons } from '../controllers/coupon.controller';
import { isAutheticated } from '../middleware/auth';

export const couponRouter = express.Router();

couponRouter.get("/get-all-coupon", isAutheticated, getAllCoupons)
// couponRouter.get("/check-coupon", isAutheticated, checkCoupon)
couponRouter.post("/create-coupon",  isAutheticated, createCoupon)
// couponRouter.post("/create-coupon",  isAutheticated, createCoupon)