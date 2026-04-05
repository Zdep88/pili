import { game, game as gameController, player as playerController } from "#controllers";

export default (io, socket) => ({
	async enterHall() {
		socket.join("hall");

		return;
	},

	async leaveHall() {
		socket.leave("hall");

		return;
	},

	async createGame() {
		const gameId = await gameController.create();

		socket.emit("game_created", gameId);

		setTimeout(async () => {
			const { players } = await gameController.getOne(gameId);
			if (players.length === 0) {
				await gameController.delete(gameId);
				console.log(`room deleted: ${gameId}`);

				const gameList = await gameController.getAll();
				io.to("hall").emit("game_list_update", gameList);
			}
		}, 200); //? on supprime la game si elle est vide après un délai (pour éviter de trigger entre deux montages de composants React)

		return;
	},

	async enterGame(gameId) {
		socket.leave("hall");

		socket.join(`game-${gameId}`);

		return;
	},

	async playerStatusChange(isReady) {
		//! change isReady in database
	},

	async leaveGame(gameId) {
		socket.leave(`game-${gameId}`);

		return;
	},

	async disconnect(reason) {
		console.log(`socket ${socket.id} disconnected: ${reason}`);

		return;
	},

	async joinRoom(roomId, socketId) {
		if (roomId === "hall") {
			const gameList = await gameController.getAll();
			io.to(socketId).emit("game_list_update", gameList);
		} else if (roomId.startsWith("game-")) {
			const gameId = roomId.slice(5);

			await playerController.join(socketId, gameId);

			const { players } = await gameController.getOne(gameId);
			io.to(`game-${gameId}`).emit("players_update", players);

			const gameList = await gameController.getAll();
			io.to("hall").emit("game_list_update", gameList);
		}

		return;
	},

	async leaveRoom(roomId, socketId) {
		if (roomId === "hall") {
			// ...
		} else if (roomId.startsWith("game-")) {
			const gameId = roomId.slice(5);
			const playerId = socketId;

			await playerController.leave(playerId, gameId);

			const { players } = await gameController.getOne(gameId);
			io.to(`game-${gameId}`).emit("players_update", players);

			const gameList = await gameController.getAll();
			io.to("hall").emit("game_list_update", gameList);

			setTimeout(async () => {
				const { players } = await gameController.getOne(gameId);
				if (players.length === 0) {
					await gameController.delete(gameId);
					console.log(`room deleted: ${gameId}`);

					const gameList = await gameController.getAll();
					io.to("hall").emit("game_list_update", gameList);
				}
			}, 200); //? on supprime la game si elle est vide après un délai (pour éviter de trigger entre deux montages de composants React)
		}

		return;
	},
});
