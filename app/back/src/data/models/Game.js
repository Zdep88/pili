import { DataTypes, Model } from 'sequelize';
import sequelize from '../connect.js';

class Game extends Model { }

Game.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isPrivate: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        maxPlayers: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "Game",
        tableName: "game",
        timestamps: false,
    });

export default Game;