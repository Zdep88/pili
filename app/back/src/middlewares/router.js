import { Router } from "express";

import { auth, errorHandler, game } from "#controllers";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "Pili-Pili" });
});

router.post("/login", auth.login);

router.get("/games", game.getAll);
router.post("/create-room", game.create);

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;
