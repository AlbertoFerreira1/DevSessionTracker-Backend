import { Router } from "express";
import * as sessionController from '../controllers/sessionController';

const router = Router();

router.get('/getSessionsByUser/:user_id', sessionController.getSessionsByUserController);
router.get('/getMonthlySessions/:user_id', sessionController.getMonthlySessions);
router.post('/addNewSession', sessionController.addNewSession);
router.put('/updateSession', sessionController.deleteSession);

export default router;