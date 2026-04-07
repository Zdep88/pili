import { errorHandler, game as gameController } from "#controllers";

const fakePlayerController = {
	list: [
		{
			id: "1",
			username: "Nicoco",
			isReady: false,
		},
		{
			id: "2",
			username: "Tibal",
			isReady: false,
		},
		{
			id: "3",
			username: "Cricri",
			isReady: false,
		},
		{
			id: "4",
			username: "Valou",
			isReady: false,
		},
	],

	async getOne(playerId) {
		const player = this.list.find((p) => p.id === playerId);

		if (player === undefined) {
			throw new Error(`Cannot get a Player (#${playerId}) that does not exist`);
		}

		return player;
	},

	async getAll() {
		return [...this.list];
	},

	async create(properties) {
		let playerId;

		do {
			playerId = Math.floor(Math.random() * 100000).toString();
		} while (this.list.find((p) => p.id === playerId) !== undefined);

		this.list.push({
			id: playerId,
			username: properties.username,
			isReady: false,
		});

		return playerId;
	},

	async update(playerId, properties) {
		const player = this.list.find((p) => p.id === playerId);

		if (player === undefined) {
			throw new Error(`Cannot update a Player (#${playerId}) that does not exist`);
		}

		for (const [key, value] of Object.entries(properties)) {
			if (key === "id") {
				continue;
			}

			player[key] = value;
		}

		return;
	},

	async delete(playerId) {
		const player = this.list.find((p) => p.id === playerId);

		if (player === undefined) {
			throw new Error(`Cannot delete a Player (#${playerId}) that does not exist`);
		}

		this.list = this.list.filter((p) => p.id !== playerId);

		return;
	},

	async join(gameId, playerId) {
		const player = this.list.find((p) => p.id === playerId);

		if (player === undefined) {
			throw new Error(`A Player (#${playerId}) who does not exist cannot join`);
		}

		const game = gameController.list.find((g) => g.id === gameId);

		if (game === undefined) {
			throw new Error(`Cannot join a Game (#${gameId}) that does not exist`);
		}

		if (game.players.find((p) => p.id === playerId) !== undefined) {
			throw new Error(
				`A Player (#${playerId}) cannot join a Game (#${gameId}) they are already in`,
			);
		}

		if (false) {
			//! à faire
			throw new Error(
				`A Player (#${playerId}) cannot join if they are already in another Game (#)`,
			);
		}

		game.players.push(player);

		return;
	},

	async leave(gameId, playerId) {
		const player = this.list.find((p) => p.id === playerId);

		if (player === undefined) {
			throw new Error(`A Player (#${playerId}) who does not exist cannot leave`);
		}

		const game = gameController.list.find((g) => g.id === gameId);

		if (game === undefined) {
			throw new Error(`Cannot leave a Game (#${gameId}) that does not exist`);
		}

		if (game.players.find((p) => p.id === playerId) === undefined) {
			throw new Error(
				`A Player (#${playerId}) cannot leave a Game (#${gameId}) they are not already in`,
			);
		}

		game.players = game.players.filter((p) => p.id !== playerId);

		return;
	},
};

export default fakePlayerController;
