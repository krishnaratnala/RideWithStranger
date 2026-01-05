"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (role) => {
    return ((req, res, next) => {
        if (!req.user) {
            res.status(403).json({ message: 'Forbidden: No user info' });
            return;
        }
        if (req.user.role !== role) {
            res
                .status(403)
                .json({ message: `Forbidden: Requires ${role} role` });
            return;
        }
        next();
    });
};
exports.roleMiddleware = roleMiddleware;
