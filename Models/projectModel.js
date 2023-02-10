//user model
module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project", {
        proj_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        proj_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        proj_status: {
            type: DataTypes.ENUM,
            values: ["waiting", "in progress", "completed"],
            allowNull: false
        },
        mngr_id: {
            type: DataTypes.STRING,
            allowNull: false,
           // unique: true,
        },
    }, { timestamps: true },)
    return Project
}