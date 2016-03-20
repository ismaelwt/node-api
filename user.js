var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name: String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});


userSchema.methods.dudify = function() {
  // add some stuff to the users name
  this.name = this.name + '-dude-teste'; 

  return this.name;
};

var userModel = mongoose.model('user', userSchema);

module.exports = userModel; 