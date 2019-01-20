const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// we create a user schema
let compteSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    transactions: {
        type: Array,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Number,
        required: false
    },
}, {runSettersOnQuery: true});

compteSchema.pre('save', function (next) {
  
  var currentDate = new Date().getTime();
  this.updatedAt = currentDate;
  if (!this.created_at) {
    this.createdAt = currentDate;
  }
  next();
})

var compte = mongoose.model('compte', compteSchema);

module.exports = compte;