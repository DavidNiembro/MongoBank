var User = require('../models/user');
var moment = require('moment');
moment.locale('fr');

/**
 * Index 
 */
exports.index = function (req, res) {

    //Search user by ID
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;

            //Create data for the chart
            comptes.chart = [];
            comptes.chartLabel = [];
            comptes.forEach(function(compte,key) {
                total = 0;
                compte.transactions.forEach(function(transaction) {
                        total += transaction.amount;
                        comptes.chart.push(total);
                        comptes.chartLabel.push(moment(transaction.createdAt).format('MM-YYYY'));
                });
                comptes[key].total=total;
            });

            res.render('pages/dashboard',{session: req.session,comptes:comptes,page:'dashboard'});
    });
};

/**
 * Detail's compte
 */
exports.compte_details = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            result.comptes.forEach(compte => {
                if(compte._id == req.params.id){
            
                    //Create data for the chart
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