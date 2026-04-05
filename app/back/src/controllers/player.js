import { errorHandler, game as gameController } from "#controllers";

const fakePlayerController = {
	list: [
		{
			id: "1",
			username: "Nicoco",
		},
		{
			id: "2",
			username: "Tibal",
		},
		{
			id: "3",
			username: "Cricri",
		},
		{
			id: "4",
			username: "Valou",
		},
	],

	async getOne(playerId) {
		return this.find((p) => p.id === playerId);
	},

	async getAll() {
		return [...this.list];
	},

	async create(properties) {
		properties.id = Math.floor(Math.random() * 100000);
		this.list.push(properties);

		return;
	},

	async update(playerId, properties) {
		const index = this.list.findIndex((p) => p.id === playerId);
		properties.id = playerId;
		this.list[index] = properties;

		return;
	},

	async delete(playerId) {
		this.list = this.list.filter((p) => p.id !== playerId);

		return;
	},

	async join(playerId, gameId) {
		const game = gameController.list.find((g) => g.id === gameId);

		game.players.push({
			id: playerId,
			username: playerId,
		});

		return;
	},

	async leave(playerId, gameId) {
		const game = gameController.list.find((g) => g.id === gameId);

		game.players = game.players.filter((p) => p.id !== playerId);

		return;
	},
};

export default fakePlayerController;
