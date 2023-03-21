module.exports = (sequelize, DataTypes) => {
    const Detail = sequelize.define("detail", {
      quantity: {
        type: DataTypes.INTEGER
      }
    });

    // Detail.associate = (models) => {
    //   Detail.belongsTo(models.order, { as: "order" });
    //   Detail.belongsTo(models.dish, { as: "dish" });
    // };
  
    return Detail;
  };