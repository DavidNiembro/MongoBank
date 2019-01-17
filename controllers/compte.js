var User = require('../models/user');

//Test controller
exports.test = function (req, res) {
     
    var newvalues = { $addToSet: {compte: [{"courant":[]}]}};
    var myquery = { _id: req.session.user.id };

    User.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
       
    }); 
    res.render('pages/compte');
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
    User.findById(req.params.id, function (err, compte) {
        if (err) return next(err);
        res.send(compte);
    })
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