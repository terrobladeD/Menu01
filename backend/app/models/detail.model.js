module.exports = (sequelize, DataTypes) => {
    const Detail = sequelize.define("detail", {
      quantity: {
        type: DataTypes.INTEGER
      }
    });

 
    return Detail;
  };