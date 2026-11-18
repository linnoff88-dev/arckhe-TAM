import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de consultas/atendimentos
router.get('/', (req, res) => {
  res.json({ message: 'Lista de consultas - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Criar consulta - TODO' });
});

export default router;
