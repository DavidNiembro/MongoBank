var User = require('../models/user');
var moment = require('moment');
moment.locale('fr');
//Test controller
exports.index = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;
            comptes.chart = []
            comptes.chartLabel = []
            comptes.forEach(function(compte,key) {
                total = 0;
                compte.transactions.forEach(function(transaction) {
                        total += transaction.amount;
                        comptes.chart.push(total);
                        comptes.chartLabel.push(moment(transaction.createdAt).format('MM-YYYY'));
                  });
                  comptes[key].total=total
              });
            res.render('pages/dashboard',{session: req.session,comptes:comptes,page:'dashboard'});
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
                if(compte._id == req.params.id){
                    total = 0;
                    compte.chart = []
                    compte.chartLabel = []
                    compte.transactions.forEach(function(transaction) {
                            total += transaction.amount;
                            compte.chart.push(total);
                            compte.chartLabel.push(moment(transaction.createdAt).format('MM-YYYY'));
                    })
                    compte.total = total
                    res.render('pages/compte',{ session: req.session, moment:moment,compte:compte,page:'dashboard'})
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