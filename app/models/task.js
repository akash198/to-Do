module.exports = (sequelize,DataTypes) =>{
    const Task = sequelize.define('Task', {
        task : DataTypes.STRING,
        done:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }

    })

    return Task
}