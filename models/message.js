// module.exports = (sequelize, DataTypes) => {
//     return sequelize.define("Message", {
//         text: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     });
// };

module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Message", {
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  };