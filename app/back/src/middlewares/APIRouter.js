import { Router } from "express";

import { auth, game, player, errorHandler } from "#controllers";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ message: "Pili-Pili" });
});

router.get("/games", game.getAll);
router.get("/games/:id", game.getOne);
router.post("/games", game.create);
router.patch("/games/:id", game.update);
router.delete("/games/:id", game.delete);

router.get("/players", player.getAll);
router.get("/players/:id", player.getOne);
router.post("/players", player.create);
router.patch("/players/:id", player.update);
router.delete("/players/:id", player.delete);
router.post("/players/:playerId/join/:joinedGameId", player.joinGame);
router.post("/players/:playerId/leave", player.leaveGame);

router.post("/login", auth.login);

router.use(errorHandler.notFound);
router.use(errorHandler.catch);

export default router;