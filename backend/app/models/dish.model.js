module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define("dish", {
      name: {
        type: DataTypes.STRING(63)
      },
      description: {
        type: DataTypes.STRING(255)
      },
      price_ori: {
        type: DataTypes.DECIMAL(5,2)
      },
      price_cur: {
        type: DataTypes.DECIMAL(5,2)
      },
      is_sold_out: {
        type: DataTypes.BOOLEAN
      },
      type: {
        type: DataTypes.STRING(63)
      },
      is_valid: {
        type: DataTypes.BOOLEAN
      },
      pict_url: {
        type: DataTypes.STRING(511)
      },
    });
  
    return Dish;
  };