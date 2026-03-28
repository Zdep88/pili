import { Router } from "express";
const router = Router();

router.use((req, res) => {
    res.send('Hello World!');
    //res.send("client/build/app.html");
});

export default router;