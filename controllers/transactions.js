var User = require('../models/user');
var Transaction = require('../models/transaction');

//Test controller
exports.index = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;
            res.render('pages/transactions',{ comptes:comptes, page:'transactions'});
    });

};

exports.transactions_create = function (req, res) {
    let {id, amount} = req.body
    User.findOne({_id : req.session.user.id}, function(err, user) {
        if (err) throw err;
        user.comptes.forEach(compte => {
            if(compte._id == id){
               dateNow = new Date().getTime();
               console.log(dateNow);
            compte.transactions.push(new Transaction({amount:amount,from:req.session.user.id,date:dateNow}));
            }
        });
        var myquery = { _id: req.session.user.id };
        User.updateOne(myquery, user, function(err) {
            if (err) throw err;
            res.redirect('/');
        
        }); 
    });
};