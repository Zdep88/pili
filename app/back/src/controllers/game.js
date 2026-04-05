import { socketio } from "#services";
import { errorHandler, player as playerController } from "#controllers";

const fakeGameController = {
	list: [
		{
			id: "58462",
			owner: {
				id: "1",
				username: "Nicoco",
			},
			isPrivate: false,
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
			max: 4,
			players: [],
		},
	],

	async getOne(gameId) {
		return this.list.find((g) => g.id === gameId);
	},

	async getAll() {
		return [...this.list];
	},

	async create() {
		const id = Math.floor(Math.random() * 100000).toString();
		const owner = playerController.list[3];
		this.list.push({
			id,
			isPrivate: true,
			max: 8,
			owner,
			players: [],
		});

		const io = socketio.io();
		io.to("hall").emit("game_list_update", this.list);

		return id;
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
