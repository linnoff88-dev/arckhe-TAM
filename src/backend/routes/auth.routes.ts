import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

/**
 * @route POST /api/auth/login
 * @desc Autenticar usuário
 * @access Public
 */
router.post('/login', authController.login);

/**
 * @route POST /api/auth/refresh
 * @desc Renovar token de acesso
 * @access Public
 */
router.post('/refresh', authController.refreshToken);

/**
 * @route POST /api/auth/logout
 * @desc Logout do usuário
 * @access Private
 */
router.post('/logout', authController.logout);

export default router;
