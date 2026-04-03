import { errorHandler } from "#controllers";

export default {
	index: async (req, res) => {
		const rooms = [
			{ id: 58462, name: "Les noobasses", private: false, players: 6, max: 8 },
			{ id: 79001, name: "Brelan !", private: true, players: 2, max: 3 },
			{ id: 13909, name: undefined, private: false, players: 1, max: 4 },
		]; //! à remplacer par résultats bdd

		res.status(200).json(rooms);
	},

	create: async (req, res, next) => {
		errorHandler.throw(418, "théière");
	},
};
