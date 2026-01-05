"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const riderController = __importStar(require("./rider.controller"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Rider
 *   description: Rider management APIs
 */
router.use(auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)('RIDER'));
/**
 * @swagger
 * /api/riders/profile:
 *   get:
 *     summary: Get rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Rider profile fetched successfully
 */
router.get('/profile', riderController.getProfile);
/**
 * @swagger
 * /api/riders/profile:
 *   put:
 *     summary: Update rider profile
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: John Doe
 *               phone: "9876543210"
 *     responses:
 *       200:
 *         description: Rider profile updated successfully
 */
router.put('/profile', riderController.updateProfile);
/**
 * @swagger
 * /api/riders/availability:
 *   patch:
 *     summary: Update rider availability
 *     tags: [Rider]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - is_available
 *             properties:
 *               is_available:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Rider availability updated successfully
 */
router.patch('/availability', riderController.updateAvailability);
exports.default = router;
