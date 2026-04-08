import { DataTypes, Model } from 'sequelize';
import sequelize from '../connect.js';

class Player extends Model { }

Player.init(
    {
        socket: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isReady: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
    },
    {
        sequelize,
        modelName: "Player",
        tableName: "player",
        timestamps: false,
    });

export default Player;