import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    console.log("Reached AuthController.register");
    try {
      const { name, email, phone_number, password, role } = req.body;
      const user = await AuthService.register({ name, email, phone_number, password, role });
      return res.status(201).json({ message: 'User registered successfully', user });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await AuthService.login({ email, password });
      return res.status(200).json({ message: 'Login successful', token });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }
}
