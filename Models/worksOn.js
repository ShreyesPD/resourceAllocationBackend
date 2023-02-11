//user model
module.exports = (sequelize, DataTypes) => {
    const worksOn = sequelize.define("worksOn", {
        enp_id: {
            allowNull: false,
           // autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        proj_id: {
            allowNull: false,
            //autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        res_status: {
            type: DataTypes.ENUM,
            values: ["probable", "confirmed"],
            allowNull: false
        },
        week_no:{
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        hrs_per_week: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, { timestamps: true },)
    return worksOn
}