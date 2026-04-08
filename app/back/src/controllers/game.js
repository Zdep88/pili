import { errorHandler } from "#controllers";
import { Game, Player } from "../data/relations.js";

const gameController = {
    getAll: async (req, res) => {
        const games = await Game.findAll({
            where: { isPrivate: false },
            include: "players"
        });
        res.status(200).json({
            statusCode: 200,
            message: "Games retrieved successfully",
            games
        });
    },

    getOne: async (req, res) => {
        if (!req.params || !req.params.id) {
            errorHandler.throw(400, "Bad Request");
        }
        const { id } = req.params;
        const game = await Game.findByPk(id, { include: "players" });
        if (!game) {
            errorHandler.throw(404, "Game not found");
        }
        res.status(200).json({
            statusCode: 200,
            message: "Game retrieved successfully",
            game
        });
    },

    create: async (req, res) => {
        if (!req.body) {
            errorHandler.throw(400, "Missing request body");
        }
        if (!req.body.name) {
            errorHandler.throw(400, "Missing mandatory field: name");
        }
        if (req.body.isPrivate === undefined) {
            errorHandler.throw(400, "Missing mandatory field: isPrivate");
        }
        if (!req.body.maxPlayers) {
            errorHandler.throw(400, "Missing mandatory field: maxPlayers");
        }
        if (req.body.maxPlayers < 2) {
            errorHandler.throw(400, "maxPlayers must be at least 2");
        }
        if (!req.body.hostId) {
            errorHandler.throw(400, "Missing mandatory field: hostId");
        }
        const { name, isPrivate, maxPlayers, hostId } = req.body;
        const host = await Player.findByPk(hostId);
        if (!host) {
            errorHandler.throw(404, "Host not found");
        }
        if (host.hostedGameId) {
            errorHandler.throw(400, "Host is already hosting a game");
        }
        if (host.joinedGameId) {
            errorHandler.throw(400, "Host has already joined a game");
        }
        try {
            const game = await Game.create(
                {
                    name,
                    isPrivate,
                    maxPlayers,
                }
            );
            host.update({ hostedGameId: game.id, joinedGameId: game.id });
            res.status(201).json({
                statusCode: 201,
                message: "Game created successfully",
                game
            });
        } catch (error) {
            errorHandler.throw(409, error.message);
        }
    },

    update: async (req, res) => {
        if (!req.params || !req.params.id) {
            errorHandler.throw(400, "Bad Request");
        }
        const { id } = req.params;
        const game = await Game.findByPk(id, { include: "players" });
        if (!game) {
            errorHandler.throw(404, "Game not found");
        }
        if (!req.body) {
            errorHandler.throw(400, "Missing request body");
        }
        if (!req.body.name) {
            errorHandler.throw(400, "Missing mandatory field: name");
        }
        if (req.body.isPrivate === undefined) {
            errorHandler.throw(400, "Missing mandatory field: isPrivate");
        }
        if (!req.body.maxPlayers) {
            errorHandler.throw(400, "Missing mandatory field: maxPlayers");
        }
        if (req.body.maxPlayers < 2) {
            errorHandler.throw(400, "maxPlayers must be at least 2");
        }
        if (req.body.maxPlayers < game.players.length) {
            errorHandler.throw(400, "maxPlayers (" + req.body.maxPlayers + ") cannot be less than currentPlayers (" + game.players.length + ")");
        }
        if (!req.body.hostId) {
            errorHandler.throw(400, "Missing mandatory field: hostId");
        }
        const { name, isPrivate, maxPlayers, hostId } = req.body;
        const host = await Player.findByPk(hostId);
        if (!host) {
            errorHandler.throw(404, "Host not found");
        }
        if (host.hostedGameId && host.hostedGameId !== game.id) {
            errorHandler.throw(400, "Host is already hosting game " + host.hostedGameId);
        }
        if (host.joinedGameId && host.joinedGameId !== game.id) {
            errorHandler.throw(400, "Host has already joined game " + host.joinedGameId);
        }
        try {
            game.update(
                {
                    name,
                    isPrivate,
                    maxPlayers,
                }
            );
            res.status(200).json({
                statusCode: 200,
                message: "Game updated successfully",
                game
            });
        } catch (error) {
            errorHandler.throw(409, error.message);
        }
    },

    delete: async (req, res) => {
        if (!req.params || !req.params.id) {
            errorHandler.throw(400, "Bad Request");
        }
        const { id } = req.params;
        const game = await Game.findByPk(id);
        if (!game) {
            errorHandler.throw(404, "Game not found");
        }
        game.destroy();
        res.status(200).json({
            statusCode: 200,
            message: "Game deleted successfully"
        });
    },
};

export default gameController;