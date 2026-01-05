"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("./auth.service");
class AuthController {
    static async register(req, res) {
        console.log("Reached AuthController.register");
        try {
            const { name, email, phone_number, password, role } = req.body;
            const user = await auth_service_1.AuthService.register({ name, email, phone_number, password, role });
            return res.status(201).json({ message: 'User registered successfully', user });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const token = await auth_service_1.AuthService.login({ email, password });
            return res.status(200).json({ message: 'Login successful', token });
        }
        catch (error) {
            return res.status(401).json({ message: error.message });
        }
    }
}
exports.AuthController = AuthController;
