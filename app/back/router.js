import errorHandler from './errorHandler.js';
import authController from './controllers/auth.js';
import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({ "message": "Pili-Pili" });
});

router.post('/login', authController.login);

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;