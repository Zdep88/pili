import { errorHandler } from "#controllers";

const fakeGameController = {
	list: [
		{
			id: "58462",
			owner: {
				id: "1",
				username: "Nicoco",
			},
			isPrivate: false,
			isStarted: false,
			max: 8,
			players: [],
		},
		{
			id: "79001",
			owner: {
				id: "2",
				username: "Tibal",
			},
			isPrivate: true,
			isStarted: false,
			max: 3,
			players: [],
		},
		{
			id: "13909",
			owner: {
				id: "3",
				username: "Cricri",
			},
			isPrivate: false,
			isStarted: false,
			max: 4,
			players: [],
		},
	],

	async getOne(gameId) {
		const game = this.list.find((g) => g.id === gameId);

		if (game === undefined) {
			throw new Error(`Cannot get a Game (#${gameId}) that does not exist`);
		}

		return game;
	},

	async getByPlayer(playerId) {
		const game = this.list.find((g) => g.players.find((p) => p.id === playerId) !== undefined);

		if (game === undefined) {
			throw new Error(`Cannot find a Game with Player #${playerId} in it`);
		}

		return game;
	},

	async getAll() {
		return [...this.list];
	},

	async create(owner) {
		const playerId = owner.id;

		const gameWithSameOwner = this.list.find((g) => g.owner.id === playerId);

		if (gameWithSameOwner !== undefined) {
			throw new Error(
				`A Player (#${playerId}) cannot create if they already own a Game (#${gameWithSameOwner.id})`,
			);
		}

		let gameId;
		do {
			gameId = Math.floor(Math.random() * 100000).toString();
		} while (this.list.find((g) => g.id === gameId) !== undefined);

		this.list.push({
			id: gameId,
			isPrivate: true,
			isStarted: false,
			max: 8,
			owner,
			players: [],
		});

		return gameId;
	},

	async update(gameId, properties) {
		const game = this.list.find((g) => g.id === gameId);

		if (game === undefined) {
			throw new Error(`Cannot update a Game (#${gameId}) that does not exist`);
		}

		for (const [key, value] of Object.entries(properties)) {
			if (key === "id") {
				continue;
			}

			game[key] = value;
		}

		return;
	},

	async delete(gameId) {
		const game = this.list.find((g) => g.id === gameId);

		if (game === undefined) {
			throw new Error(`Cannot delete a Game (#${gameId}) that does not exist`);
		}

		if (game.isStarted) {
			throw new Error(`Cannot delete a Game (#${gameId}) that is started`);
		}

		if (game.players.length > 0) {
			throw new Error(`Cannot delete a Game (#${gameId}) that still has players`);
		}

		this.list = this.list.filter((g) => g.id !== gameId);

		return;
	},
};

export default fakeGameController;
