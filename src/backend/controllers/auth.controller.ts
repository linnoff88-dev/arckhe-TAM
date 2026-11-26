import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import logger from '../utils/logger';

class AuthController {
  /**
   * Login de usuário
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validaçêo básica
      if (!email || !password) {
        res.status(400).json({
          error: 'Email e senha sêo obrigatórios'
        });
        return;
      }

      // TODO: Buscar usuário no banco de dados
      // Por enquanto, mock para demonstraçêo
      const mockUser = {
        id: '1',
        name: 'Dr. Roberto Silva',
        email: 'roberto@example.com',
        role: 'medico',
        password: await bcrypt.hash('senha123', 10) // senha123 hasheada
      };

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(password, mockUser.password);
      if (!isPasswordValid) {
        res.status(401).json({
          error: 'Credenciais inválidas'
        });
        return;
      }

      // Gerar JWT
      const token = jwt.sign(
        {
          id: mockUser.id,
          email: mockUser.email,
          role: mockUser.role
        },
        (process.env.JWT_SECRET || 'secret') as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN || '8h') as string }
      );

      // Gerar Refresh Token
      const refreshToken = jwt.sign(
        { id: mockUser.id },
        (process.env.JWT_SECRET || 'secret') as string,
        { expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '30d') as string }
      );

      logger.info(`User ${mockUser.email} logged in successfully`);

      res.json({
        user: {
          id: mockUser.id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role
        },
        token,
        refreshToken
      });
    } catch (error: any) {
      logger.error('Login error:', error);
      res.status(500).json({
        error: 'Erro ao fazer login',
        message: error.message
      });
    }
  }

  /**
   * Refresh token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({
          error: 'Refresh token é obrigatório'
        });
        return;
      }

      // Verificar refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET || 'secret'
      ) as any;

      // Gerar novo access token
      const newToken = jwt.sign(
        {
          id: decoded.id,
          email: decoded.email,
          role: decoded.role
        },
        (process.env.JWT_SECRET || 'secret') as string,
        { expiresIn: (process.env.JWT_EXPIRES_IN || '8h') as string }
      );

      res.json({
        token: newToken
      });
    } catch (error: any) {
      logger.error('Refresh token error:', error);
      res.status(401).json({
        error: 'Refresh token inválido'
      });
    }
  }

  /**
   * Logout
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Invalidar token (adicionar em blacklist no Redis)
      logger.info('User logged out');

      res.json({
        message: 'Logout realizado com sucesso'
      });
    } catch (error: any) {
      logger.error('Logout error:', error);
      res.status(500).json({
        error: 'Erro ao fazer logout'
      });
    }
  }
}

export default AuthController;
