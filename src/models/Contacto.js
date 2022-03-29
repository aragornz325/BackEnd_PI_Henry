const { urlencoded } = require('body-parser');
const { DataTypes, UUID, STRING } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Contacto", {
    
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty:true,
      isEmail: true,
    },
    direpost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
       
  });
};