var User = require('../models/user');
var Compte = require('../models/compte');
var Transaction = require('../models/transaction');

//Test controller
exports.index = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;
            res.render('pages/guichet',{ comptes:comptes, page:'guichet'});
    });

};

exports.guichet_create = function (req, res) {
    let {id, amount} = req.body
    User.findOne({_id : req.session.user.id}, function(err, user) {
        if (err) throw err;
        user.comptes.forEach(compte => {
            if(compte._id == id){
              compte.transactions.push(new Transaction({amount:amount,from:req.session.user.id}));
            }
        });
        var myquery = { _id: req.session.user.id };
        User.updateOne(myquery, user, function(err) {
            if (err) throw err;
            res.redirect('/');
        
        }); 
    });
};
