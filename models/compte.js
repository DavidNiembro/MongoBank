var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompteSchema = new Schema({
    intern_id: {type: Number, required: true},
    fkUser: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Compte', CompteSchema);