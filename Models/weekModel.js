//user model
module.exports = (sequelize, DataTypes) => {
    const week = sequelize.define("week", {
        week_no:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        start_date: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        end_date : {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, { timestamps: true },)
    return week
}