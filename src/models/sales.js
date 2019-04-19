const sales = (sequelize, DataTypes) => {
    const salesModel = sequelize.define('sales', {
      id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      provider_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      client_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
        created: {
          type: DataTypes.DATE,
          allowNull: false
      }
    }, {
      tableName: 'sales',
    });
  
    return salesModel;
  };
  
  export default sales;