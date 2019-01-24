var User = require('../models/user');
var Transaction = require('../models/transaction');

//Test controller
exports.index = function (req, res) {
    User.findOne({_id : req.session.user.id}, function(err, result) {
        if (err) throw err;
            comptes = result.comptes;
            User.find({},{comptes:0,password:0},function(err, users) {
                if (err) throw err;
                res.render('pages/transactions',{ session: req.session,users:users, comptes:comptes, page:'transactions'});
            });
            
    });

};

exports.transactions_create = function (req, res) {
    let {id, fk, amount} = req.body
    User.findOne({_id : req.session.user.id}, function(err, user) {
        if (err) throw err;
        user.comptes.forEach(compte => {
            if(compte._id == id){
                dateNow = new Date();
                User.findOne({_id : fk}, function(err, userFk) {
                    if (err) throw err;
                        compte.transactions.push(new Transaction({amount:-amount,from:{user:userFk.username , compte:compte.name},createdAt:dateNow}))
                        var myquery = { _id: req.session.user.id };
                        //User.updateOne(myquery, user, function(err) {
                          //  if (err) throw err;
                        //});
                });
            }
        });
    }),
    User.findOne({_id : fk}, function(err, userFk) {
        if (err) throw err;
            userFk.comptes.forEach(comptefk=>{
                if(comptefk.name=="Courant"){
                        dateNow = new Date();
                        User.findOne({_id : req.session.user.id}, function(err, user) {
                            console.log("4 =>",user)
                            user.comptes.forEach(compte => {
                                console.log("5")
                                if(compte._id == id){
                            comptefk.transactions.push(new Transaction({amount:amount,from:{user:user.username , compte:compte.name},createdAt:dateNow}))
                            var myqueryfk = { _id: fk };
                            User.updateOne(myqueryfk, userFk, function(err) {
                                if (err) throw err;
                            });
                        }})
                        });
                    }
                });
        });
    
        res.redirect('/');    
    
};
