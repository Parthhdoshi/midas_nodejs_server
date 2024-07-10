import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import CouponCodeModel from "../models/coupon.models";
import userModel from "../models/user.model";
import CourseModel from "../models/course.model";

export const getAllCoupons = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const getAllCouponData = await CouponCodeModel.find().sort({ createdAt: -1 }).select('couponCode status');
        res.status(200).json({
          success: true,
          getAllCouponData
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );

export const checkCoupon = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const getAllCouponData = await CouponCodeModel.find().sort({ createdAt: -1 }).select('couponCode status');
        res.status(200).json({
          success: true,
          getAllCouponData
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );

export const createCoupon = CatchAsyncError(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { couponCode, status, count, userId, courseId, } = req.body as any;

        //  Check if user exists
        const userExists = await userModel.exists({ _id: userId });
        if (!userExists) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }

        // Check if course exists (optional, remove if not needed)
        // const courseExists = await CourseModel.exists({ _id: courseId });
        // if (!courseExists) {
        // return res.status(400).json({ success: false, message: 'Course does not exist' });
        // }

        await CouponCodeModel.create({
          couponCode, status, count, userId, courseId,
        })
        res.status(201).json({
            couponCode, status, count, userId, courseId,
            success: true,
          });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }
    }
  );