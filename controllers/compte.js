var User = require('../models/user');

//Test controller
exports.index = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;
            comptes.forEach(function(compte,key) {
                total = 0;
                compte.transactions.forEach(function(transaction) {
                        total += transaction.amount;
                  });
                  comptes[key].total=total
              });
            res.render('pages/dashboard',{comptes:comptes,page:'dashboard'});
    });
};

exports.compte_create = function (req, res) {
    
    var newvalues = { 
        $set: {
            compte: [{
                "Courant":[]
            }]
        }
    };
    var myquery = { _id: req.session.user.id };

    User.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
       
    }); 
    res.render('pages/compte');
};

exports.compte_details = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            result.comptes.forEach(compte => {
                if(compte._id==req.params.id){
                    console.log(compte)
                    res.render('pages/compte',{compte:compte,page:'dashboard'})
                }
            });
    });
    
};

exports.compte_update = function (req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, compte) {
        if (err) return next(err);
        res.send('Compte udpated.');
    });
};

exports.compte_delete = function (req, res) {
    User.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};