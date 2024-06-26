"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCoupon = exports.getAllCoupons = void 0;
const catchAsyncErrors_1 = require("../middleware/catchAsyncErrors");
const ErrorHandler_1 = __importDefault(require("../utils/ErrorHandler"));
const coupon_models_1 = __importDefault(require("../models/coupon.models"));
const user_model_1 = __importDefault(require("../models/user.model"));
exports.getAllCoupons = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const getAllCouponData = await coupon_models_1.default.find().sort({ createdAt: -1 }).select('couponCode status');
        res.status(200).json({
            success: true,
            getAllCouponData
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
exports.createCoupon = (0, catchAsyncErrors_1.CatchAsyncError)(async (req, res, next) => {
    try {
        const { couponCode, status, count, userId, courseId, } = req.body;
        //  Check if user exists
        const userExists = await user_model_1.default.exists({ _id: userId });
        if (!userExists) {
            return res.status(400).json({ success: false, message: 'User does not exist' });
        }
        // Check if course exists (optional, remove if not needed)
        // const courseExists = await CourseModel.exists({ _id: courseId });
        // if (!courseExists) {
        // return res.status(400).json({ success: false, message: 'Course does not exist' });
        // }
        res.status(201).json({
            couponCode, status, count, userId, courseId,
            success: true,
        });
    }
    catch (error) {
        return next(new ErrorHandler_1.default(error.message, 500));
    }
});
