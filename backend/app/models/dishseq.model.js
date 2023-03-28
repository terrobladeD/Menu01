module.exports = (sequelize, DataTypes) => {
    const Dishseq = sequelize.define("Dishseq", {
        type: {
            type: DataTypes.STRING
        },
        priority: {
            type: DataTypes.INTEGER
        }
    });

    return Dishseq;
};