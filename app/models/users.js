module.exports = (sequelize,DataTypes) =>{
  const User = sequelize.define('User',{
      email:{
          type : DataTypes.STRING,
          allowNull: false,
          unique : true
      },
      password : {
          type: DataTypes.STRING,
          allowNull: false,
      },
      role:{
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'user'
      },
      name : DataTypes.STRING
  })

  User.associate = (models) =>{
      User.belongsTo(models.Task, {foreignKey : 'TaskId'})
  }

  return User
}