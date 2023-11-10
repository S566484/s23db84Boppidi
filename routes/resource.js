var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var Nuts_controller = require('../controllers/Nuts');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/Nuts', Nuts_controller.Nuts_create_post);
// DELETE request to delete Costume.
router.delete('/Nuts/:id', Nuts_controller.Nuts_delete);
// PUT request to update Costume.
router.put('/Nuts/:id', Nuts_controller.Nuts_update_put);
// GET request for one Costume.
router.get('/Nuts/:id', Nuts_controller.Nuts_detail);
// GET request for list of all Costume items.
router.get('/Nuts', Nuts_controller.Nuts_list);
module.exports = router;
// API for our resources
exports.api = function(req, res) {
res.write('[');
res.write('{"resource":"Nuts", ');
res.write(' "verbs":["GET","PUT", "DELETE"] ');
res.write('}');
res.write(']')
res.send();
};
