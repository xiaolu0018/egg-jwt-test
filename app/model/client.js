module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Client = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    /*  */
    clientName:{
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        // 'this' allows you to access attributes of the instance
        return this.getDataValue('client_name');
      },
      set(){

      }
    }
  });

  return Client;
};