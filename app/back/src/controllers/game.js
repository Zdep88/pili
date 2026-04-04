import { socketio } from "#services";
import { errorHandler } from "#controllers";

import Message from "../../../shared/models/Message.js";

const controller = {
	getAll: async () => {
		const rooms = [
			{ id: 58462, name: "Les noobasses", private: false, players: 6, max: 8 },
			{ id: 79001, name: "Brelan !", private: true, players: 2, max: 3 },
			{ id: 13909, name: undefined, private: false, players: 1, max: 4 },
		]; //! à remplacer par résultats bdd

		return rooms;
	},

	create: async (req, res, next) => {
		//! création à faire

		const games = await controller.getAll();

		const io = socketio.io();
		new Message("games_list").loadWith({ games }).sendTo(io.to("hall"));

		res.status(200).json({
			created: true,
			id: 11789,
		});
	},
};

export default controller;
