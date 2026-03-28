import errorHandler from './errorHandler.js';
import { Router } from "express";
const router = Router();

router.use((req, res) => {
    res.status(200).json({ "message": "Hello World!" });
});

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;