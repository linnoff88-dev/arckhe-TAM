import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de agendamentos
router.get('/', (req, res) => {
  res.json({ message: 'Lista de agendamentos - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Criar agendamento - TODO' });
});

export default router;
