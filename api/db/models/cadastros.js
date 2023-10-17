'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cadastros extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cadastros.init({
    type: DataTypes.STRING,
    rg: DataTypes.STRING,
    name: DataTypes.STRING,
    empresa: DataTypes.STRING,
    apt: DataTypes.NUMBER,
    bloco: DataTypes.STRING,
    dataEntrada: DataTypes.DATE,
    veiculo: DataTypes.STRING,
    placa: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cadastros',
  });
  return Cadastros;
};