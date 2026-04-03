import { errorHandler } from "#controllers";

export default {
	getAll: async (req, res) => {
		const rooms = [
			{ id: 58462, name: "Les noobasses", private: false, players: 6, max: 8 },
			{ id: 79001, name: "Brelan !", private: true, players: 2, max: 3 },
			{ id: 13909, name: undefined, private: false, players: 1, max: 4 },
		]; //! à remplacer par résultats bdd

		//? Deux options :
		//?   1- les salons privés ne sont pas renvoyés au client et sont accessibles uniquement avec l'url
		//?   2- les salons privés demandent un mot de passe et sont visibles dans la liste des rooms

		res.status(200).json(rooms);
	},

	create: async (req, res, next) => {
		//! à faire

		res.status(200).json({
			created: true,
			id: 11789,
		});
	},
};
