module.exports = (sequelize, DataTypes) => {
    const Dish = sequelize.define("dish", {
      name: {
        type: DataTypes.STRING
      },
      short_name: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      },
      full_description: {
        type: DataTypes.STRING
      },
      price_ori: {
        type: DataTypes.DOUBLE
      },
      price_cur: {
        type: DataTypes.DOUBLE
      },
      is_sold_out: {
        type: DataTypes.BOOLEAN
      },
      type: {
        type: DataTypes.STRING
      },
      is_valid: {
        type: DataTypes.BOOLEAN
      },
      pict_url: {
        type: DataTypes.STRING
      }
    });
  
    return Dish;
  };