var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var ingredientsSchema = new Schema({
  description:{ type: String, required: true },
  ingredients: { type: String, required: true },
  image:String,
  dateCreation: Date,
  dateUpdate: Date
});


ingredientsSchema.methods.validation = function() {
  if(!this.descrption){
    return "Error! empty descrption";
  }else if(!this.ingredient) {
    return "Error! empty ingredient";
  }
};

var userModel = mongoose.model('ingredients', ingredientsSchema);

module.exports = userModel; 