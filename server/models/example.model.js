const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pushUpdater = require('../ws/push-updater');

const exampleSchema = new Schema({
  name: String,
  createdOn: Date,
  meta: {
    foo: String,
    bar: String
  },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, // "foreign key" to User table
  isActive: { type: Boolean, default: false }
});

const exampleModel = mongoose.model('Example', exampleSchema);

/*
// Optional: Sends notification of changes to clients
// Public Data
exampleModel.watch()
  .on('change', pushUpdater.emitPublic);
// Private Data
exampleModel.watch()
  .on('change', (data) => {
    // Set userId according to the relevant model field
    // For example:
    const userId = data.fullDocument.userId;
    pushUpdater.emitPrivate(data, userId);
  });
*/

module.exports = exampleModel;