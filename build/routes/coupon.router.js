"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.couponRouter = void 0;
const express_1 = __importDefault(require("express"));
const coupon_controller_1 = require("../controllers/coupon.controller");
const auth_1 = require("../middleware/auth");
exports.couponRouter = express_1.default.Router();
exports.couponRouter.get("/get-all-coupon", auth_1.isAutheticated, coupon_controller_1.getAllCoupons);
exports.couponRouter.post("/create-coupon", auth_1.isAutheticated, coupon_controller_1.createCoupon);
// couponRouter.post("/create-coupon",  isAutheticated, createCoupon)
