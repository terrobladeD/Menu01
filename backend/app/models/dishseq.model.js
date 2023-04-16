module.exports = (sequelize, DataTypes) => {
    const Dishseq = sequelize.define("dishseq", {
        type: {
            type: DataTypes.STRING
        },
        priority: {
            type: DataTypes.INTEGER
        }
    });

    return Dishseq;
};