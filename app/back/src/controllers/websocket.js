import { game as gameController, player as playerController } from "#controllers";

/**
 * Ne pas confondre :
 *
 * socketId     id du socket Socket.io
 * playerId     id du record Player dans la bdd
 *
 * roomId       id de la room Socket.io
 * gameId       id du record Game dans la bdd
 *
 */

async function updateHall(io) {
	const gameList = await gameController.getAll();

	io.to("hall").emit("game_list_update", gameList);
}

function deleteGameIfEmpty(io, gameId) {
	//? on supprime la game si elle est vide après un délai (pour éviter de trigger entre deux montages de composants React)
	setTimeout(async () => {
		try {
			await gameController.delete(gameId);
		} catch (error) {
			console.error(error.message);
		} finally {
			updateHall(io);
		}
	}, 200);
}

const controller = (io, socket) => ({
	enterHall: async function () {
		const socketId = socket.id;

		socket.join("hall");

		const gameList = await gameController.getAll();
		io.to(socketId).emit("game_list_update", gameList);

		return;
	},

	async leaveHall() {
		socket.leave("hall");

		return;
	},

	async createGame() {
		const owner = socket.request.session.user;

		try {
			const gameId = await gameController.create(owner);

			socket.emit("game_created", gameId);

			deleteGameIfEmpty(io, gameId);
		} catch (error) {
			console.error(error.message);

			socket.emit("game_creation_error");
		}

		return;
	},

	async enterGame(gameId) {
		const roomId = `game-${gameId}`;
		const playerId = socket.request.session.user?.id;

		if (playerId === undefined) {
			// not logged
			//! à faire
		}

		try {
			await playerController.join(gameId, playerId);

			socket.join(roomId);

			socket.emit("enter_game_success");

			const { players } = await gameController.getOne(gameId);
			io.to(roomId).emit("players_update", players);

			updateHall(io);
		} catch (error) {
			console.error(error.message);

			socket.emit("enter_game_error");
		}

		return;
	},

	async playerStatusChange(isReady) {
		//! change isReady in database
	},

	async leaveGame(gameId) {
		const roomId = `game-${gameId}`;
		const playerId = socket.request.session.user?.id;

		try {
			await playerController.leave(playerId, gameId);

			socket.leave(roomId);

			const { players } = await gameController.getOne(gameId);
			io.to(roomId).emit("players_update", players);

			deleteGameIfEmpty(io, gameId);
		} catch (error) {
			console.error(error.message);
		}
	},

	disconnecting: async () => {
		for (const roomId of socket.rooms) {
			if (roomId === "hall") {
				await controller(io, socket).leaveHall();
			} else if (roomId.startsWith("game-")) {
				const gameId = roomId.slice(5);

				await controller(io, socket).leaveGame(gameId);
			}
		}

		return;
	},

	async disconnect(reason) {
		console.log(`socket ${socket.id} disconnected: ${reason}`);

		return;
	},
});

export default controller;
