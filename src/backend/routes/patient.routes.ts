import { Router } from 'express';

const router = Router();

// TODO: Implementar rotas de pacientes
router.get('/', (req, res) => {
  res.json({ message: 'Lista de pacientes - TODO' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Criar paciente - TODO' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Detalhes do paciente ${req.params.id} - TODO` });
});

export default router;
