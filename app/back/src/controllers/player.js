import { errorHandler } from "#controllers";
import { Game, Player } from "../data/relations.js";

const playerController = {
    getAll: async (req, res) => {
        const players = await Player.findAll();
        res.status(200).json({
            statusCode: 200,
            message: "Players retrieved successfully",
            players
        });
    },

    getOne: async (req, res) => {
        if (!req.params || !req.params.id) {
            errorHandler.throw(400, "Bad Request");
        }
        const { id } = req.params;
        const player = await Player.findByPk(id);
        if (!player) {
            errorHandler.throw(404, "Player not found");
        }
        res.status(200).json({
            statusCode: 200,
            message: "Player retrieved successfully",
            player
        });
    },

    create: async (req, res) => {
        if (!req.body) {
            errorHandler.throw(400, "Missing request body");
        }
        if (!req.body.socket) {
            errorHandler.throw(400, "Missing mandatory field: socket");
        }
        const { socket } = req.body;
        const gemini = await Player.findOne({ where: { socket } });
        if (gemini) {
            errorHandler.throw(409, "Player with the same socket already exists");
        }
        try {
            const player = await Player.create({ socket });
            res.status(201).json({
                statusCode: 201,
                message: "Player created successfully",
                player
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
        const player = await Player.findByPk(id);
        if (!player) {
            errorHandler.throw(404, "Player not found");
        }
        if (!req.body) {
            errorHandler.throw(400, "Missing request body");
        }
        if (!req.body.socket) {
            errorHandler.throw(400, "Missing mandatory field: socket");
        }
        if (req.body.isReady === undefined) {
            errorHandler.throw(400, "Missing mandatory field: isReady");
        }
        const { socket, isReady } = req.body;
        const gemini = await Player.findOne({ where: { socket } });
        if (gemini && gemini.id !== player.id) {
            errorHandler.throw(409, "Player with the same socket already exists");
        }
        try {
            player.update({ socket, isReady });
            res.status(200).json({
                statusCode: 200,
                message: "Player updated successfully",
                player
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
        const player = await Player.findByPk(id);
        if (!player) {
            errorHandler.throw(404, "Player not found");
        }
        if (player.hostedGameId) {
            errorHandler.throw(409, "Player is hosting game " + player.hostedGameId);
        }
        if (player.joinedGameId) {
            errorHandler.throw(409, "Player is in game " + player.joinedGameId);
        }
        player.destroy();
        res.status(200).json({
            statusCode: 200,
            message: "Player deleted successfully"
        });
    },

    joinGame: async (req, res) => {
        if (!req.params || !req.params.playerId || !req.params.joinedGameId) {
            errorHandler.throw(400, "Bad Request");
        }
        const { playerId, joinedGameId } = req.params;
        const player = await Player.findByPk(playerId);
        if (!player) {
            errorHandler.throw(404, "Player not found");
        }
        if (player.joinedGameId) {
            errorHandler.throw(409, "Player is already in game " + player.joinedGameId);
        }
        const game = await Game.findByPk(joinedGameId, { include: "players" });
        if (!game) {
            errorHandler.throw(404, "Game not found");
        }
        if (game.currentPlayers === game.maxPlayers) {
            errorHandler.throw(409, "Game is full");
        }
        try {
            player.update({ joinedGameId });
            game.update({ currentPlayers: game.currentPlayers + 1 });
            res.status(200).json({
                statusCode: 200,
                message: "Player joined game successfully",
                player,
                game
            });
        } catch (error) {
            errorHandler.throw(409, error.message);
        }
    },

    leaveGame: async (req, res) => {
        if (!req.params || !req.params.playerId) {
            errorHandler.throw(400, "Bad Request");
        }
        const { playerId } = req.params;
        const player = await Player.findByPk(playerId);
        if (!player) {
            errorHandler.throw(404, "Player not found");
        }
        if (!player.joinedGameId) {
            errorHandler.throw(409, "Player is not in a game");
        }
        const game = await Game.findByPk(player.joinedGameId, { include: "players" });
        if (!game) {
            errorHandler.throw(404, "Game not found");
        }
        try {
            player.update({ joinedGameId: null });
            game.update({ currentPlayers: game.currentPlayers - 1 });
            res.status(200).json({
                statusCode: 200,
                message: "Player left game successfully",
                player,
                game
            });
        } catch (error) {
            errorHandler.throw(409, error.message);
        }
    }
};

export default playerController;