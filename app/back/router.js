import errorHandler from './errorHandler.js';
import { Router } from "express";
const router = Router();

router.get("/test", (req, res) => {
    res.json({ response: "oui cheeeeef" });
})

router.use((req, res) => {
    res.send('Hello World!');
    //res.send("client/build/app.html");
});

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;