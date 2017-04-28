'use strict';

module.exports = function (sequelize, DataTypes) {
  var File = sequelize.define('File', {
    'name': DataTypes.STRING,
    'size': DataTypes.INTEGER,
    'type': DataTypes.STRING
  }, {
    'classMethods': {
      'associate': function associate(models) {
        File.belongsTo(models.Contact);
      }
    }
  });
  return File;
};