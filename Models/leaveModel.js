//user model
module.exports = (sequelize, DataTypes) => {
    const Leave = sequelize.define("Leave", {
        week_no: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.STRING,
        },
        emp_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        d1: {
            type: DataTypes.ENUM,
            values: ["full day", "half day"],
            allowNull: false
        },
        d2: {
            type: DataTypes.ENUM,
            values: ["full day", "half day"],
            allowNull: false
        },
        d3: {
            type: DataTypes.ENUM,
            values: ["full day", "half day"],
            allowNull: false
        },
        d4: {
            type: DataTypes.ENUM,
            values: ["full day", "half day"],
            allowNull: false
        },
        d5: {
            type: DataTypes.ENUM,
            values: ["full day", "half day"],
            allowNull: false
        },
        time_avail: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, { timestamps: true },)
    return Leave
}