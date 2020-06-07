var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var exampleSchema = new Schema({
  name: String,
  createdOn: Date,
  meta: {
    foo: String,
    bar: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // "foreign key" to User table
  isActive: { type: Boolean, default: false }
});

module.exports = mongoose.model('Example', exampleSchema);