var express = require('express');
const Nuts_controlers= require('../controllers/Nuts');
var router = express.Router();
// GET request for one Nuts.
router.get('/Nuts/:id', Nuts_controlers.Nuts_detail);
/* GET Nutss */
router.get('/', Nuts_controlers.Nuts_view_all_Page );
module.exports = router;
/* GET detail Nuts page */
router.get('/detail', Nuts_controlers.Nuts_view_one_Page);
/* GET create Nuts page */
router.get('/create', Nuts_controlers.Nuts_create_Page);
/* GET create update page */
router.get('/update', Nuts_controlers.Nuts_update_Page);
/* GET delete Nuts page */
router.get('/delete', Nuts_controlers.Nuts_delete_Page);
