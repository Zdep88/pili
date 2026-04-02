import { Router } from "express";

import { auth, errorHandler } from "#controllers";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "Pili-Pili" });
});

router.get("/rooms", (req, res) => {
	const rooms = [
		{ id: 58462, private: false, players: 6, max: 8 },
		{ id: 79001, private: false, players: 2, max: 3 },
	]; //! à remplacer par résultats bdd
	res.status(200).json(rooms);
});

router.post("/login", auth.login);

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;
