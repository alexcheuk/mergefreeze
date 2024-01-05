"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
require("../../configs/passport.github");
var auth_middleware_1 = require("../auth/middlewares/auth.middleware");
var user_controller_1 = __importDefault(require("./controller/user.controller"));
var router = (0, express_1.Router)();
router.get('/api/profile', auth_middleware_1.authMiddleware, user_controller_1.default.getProfile);
exports.default = router;
//# sourceMappingURL=routes.js.map