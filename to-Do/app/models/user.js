module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'student',
      },
      name: DataTypes.STRING,
      class: DataTypes.STRING,
    })
  
    Student.associate = (models) => {
      Student.belongsTo(models.School, { foreignKey: 'SchoolId' })
      Student.belongsTo(models.Stream, { foreignKey: 'StreamId' })
    }
  
    return Student
  }
  