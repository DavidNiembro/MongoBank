const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// we create a user schema
let transactionSchema = new Schema({
    from: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
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

transactionSchema.pre('save', function (next) {
  
  var currentDate = new Date().getTime();
  this.updatedAt = currentDate;
  if (!this.created_at) {
    this.createdAt = currentDate;
  }
  next();
})

var transaction = mongoose.model('transaction', transactionSchema);

module.exports = transaction;