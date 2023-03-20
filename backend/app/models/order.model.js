module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      total_price: {
        type: DataTypes.DOUBLE
      },
      table_num: {
        type: DataTypes.INTEGER
      },
      date: {
        type: DataTypes.DATE
      },
      email: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.BOOLEAN
      },
      additional_info: {
        type: DataTypes.STRING
      }
    });
  
    return Order;
  };