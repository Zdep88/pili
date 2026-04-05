import { errorHandler } from "#controllers";
import { socketio } from "#services";

const fakeGameController = {
	list: [
		{ id: "58462", name: "Les noobasses", isPrivate: false, max: 8, players: [] },
		{ id: "79001", name: "Brelan !", isPrivate: true, max: 3, players: [] },
		{ id: "13909", name: undefined, isPrivate: false, max: 4, players: [] },
	],

	async getOne(gameId) {
		return this.list.find((g) => g.id === gameId);
	},

	async getAll() {
		return [...this.list];
	},

	async create(properties) {
		properties.id = Math.floor(Math.random() * 100000);
		properties.players = [];
		this.list.push(properties);

		const io = socketio.io();
		io.to("hall").emit("game_list_update", this.list);

		return;
	},

	async update(gameId, properties) {
		const index = this.list.findIndex((g) => g.id === gameId);
		properties.id = gameId;
		this.list[index] = properties;

		const io = socketio.io();
		io.to("hall").emit("game_list_update", this.list);

		return;
	},

	async delete(gameId) {
		this.list = this.list.filter((g) => g.id !== gameId);

		return;
	},
};

export default fakeGameController;
