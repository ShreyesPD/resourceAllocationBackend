//user model
module.exports = (sequelize, DataTypes) => {
    const Activity_Log = sequelize.define("Activity_Log", {
        time: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.timestamps,
        },
        date: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.date,
        },
        user_id:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        descr: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, { timestamps: true },)
    return Activity_Log
}