var Compte = require('../models/compte');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.compte_create = function (req, res) {
    var compte = new Compte(
        {
            intern_id: req.body.intern_id,
            fkUser: req.body.fkUser
        }
    );

    compte.save(function (err) {
        if (err) {
            return err;
        }
        res.send('Compte Created successfully')
    })
};

exports.compte_details = function (req, res) {
    Compte.findById(req.params.id, function (err, compte) {
        if (err) return next(err);
        res.send(compte);
    })
};

exports.compte_update = function (req, res) {
    Compte.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, compte) {
        if (err) return next(err);
        res.send('Compte udpated.');
    });
};

exports.compte_delete = function (req, res) {
    Compte.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};