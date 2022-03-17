const { Model, DataTypes } = require("sequelize");
const sequelize = require("./db/database-connection");
const bcrypt = require("bcrypt");

class User extends Model {
  passwordCheck(userPassword) {
    return bcrypt.compareSync(userPassword, this.password)
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(userData) {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData
      },
    },
    sequelize,
    modelName: "user",
    timestamps: false,
    freezeTableName: true,
    underscored: true,
  }
);

module.exports = User