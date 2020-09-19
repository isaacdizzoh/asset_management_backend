module.exports = app => {
    const assets = require('../controllers/asset.controller');
    
    app.post('/assets', assets.create);

    app.get('/assets', assets.findAll);

    app.get('/assets/:assetCode', assets.findOne);

    app.put('/assets/:assetCode', assets.update);

    app.delete('/assets/:assetCode', assets.delete);
};