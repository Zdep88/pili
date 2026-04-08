import sequelize from "./connect.js";
import Game from "./models/Game.js";
import Player from "./models/Player.js";

Game.hasMany(Player, { foreignKey: "joinedGameId", as: "players", onDelete: "CASCADE" });
Game.hasOne(Player, { foreignKey: "hostedGameId", as: "host", onDelete: "CASCADE" });

export { sequelize, Game, Player };