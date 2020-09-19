const sql = require('./db');

const Asset = function(asset){
    this.asset_code = asset.asset_code;
    this.asset_barcode = asset.asset_barcode;
    this.asset_type = asset.asset_type;
    this.asset_name = asset.asset_name;
    this.person_name = asset.person_name;
    this.location = asset.location;
    this.purchase_date = asset.purchase_date;
    this.supplier = asset.supplier;
    this.amount = asset.amount;
    this.status = asset.status;
}

Asset.create = (newAsset, result) => {
    sql.query("INSERT INTO asset_info SET ?", newAsset, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        result(null, { asset_code: res.asset_code, ...newAsset});
    });
};

Asset.findById = (assetId, result) => {
    sql.query("SELECT * FROM asset_info WHERE asset_code = ?", assetId, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        result({ kind : "not found"}, null);
    });
};

Asset.getAll = (result) => {
    sql.query("SELECT * FROM asset_info", (err, res) => {
        if (err) {
            result(null, res);
            return;
        }
        result(null, res);
    });
};

Asset.updateById = (assetId, asset, result) => {
    sql.query("UPDATE asset_info SET asset_barcode = ?, asset_type = ?, asset_name = ?, person_name = ?, location = ?, purchase_date = ?, supplier = ?, amount = ?, status = ? WHERE asset_code = ?",
    [asset.asset_barcode, asset.asset_type, asset.asset_name, asset.person_name, asset.location, asset.purchase_date, asset.supplier, asset.amount, asset.status, assetId], (err, res) =>{
        if (err) {
            result(null, res);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind : "not found" }, null);
            return;
        }

        result(null, { asset_code : asset_code, ...asset});
    });
};

Asset.remove = (assetCode, result) => {
    sql.query("DELETE FROM asset_info WHERE asset_code = ?", assetCode, (err, res) => {
        if (err) {
            result(null, res);
            return;
        }

        if (res.affectedRows == 0) {
            result({
                kind: "not found"
            }, null);
            return;
        }

        result(null, res);
    });
};

module.exports = Asset;