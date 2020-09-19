const Asset = require('../models/asset.model');

//Create and save New Asset
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const asset = new Asset({
       asset_code : req.body.asset_code,
       asset_barcode: req.body.asset_barcode,
       asset_type: req.body.asset_type,
       asset_name: req.body.asset_name,
       person_name: req.body.person_name,
       location: req.body.location,
       purchase_date: req.body.purchase_date,
       supplier: req.body.supplier,
       amount: req.body.amount,
       status: req.body.status
    });

    Asset.create(asset, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error Ocurred"
            });
        }
        else res.send(data);
    });
};

//Get all assets from database
exports.findAll = (req, res) => {
    Asset.getAll((err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error Ocurred"
            });
        } else res.send(data);
    });
};

//Retrieving a single asset
exports.findOne = (req, res) => {
    Asset.findById(req.params.assetCode, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving"
                });
            }
        } else res.send(data);
    });
};

//Updating asset by asset_code
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Asset.updateById(req.params.assetCode, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer `
                });
            } else {
                res.status(500).send({
                    message: "Error updating Customer "
                });
            }
        } else res.send(data);
    });
};

//Deleting asset by asset code
exports.delete = (req, res) => {
    Asset.remove(req.params.assetCode, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found .`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete"
                });
            }
        } else res.send({
            message: `Asset was deleted successfully!`
        });
    });
};