const User = require('./User');
const Bill = require('./Bill');

User.hasMany(Bill, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Bill.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Bill };
