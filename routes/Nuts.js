var express = require('express');
const Nuts_controlers= require('../controllers/Nuts');
var router = express.Router();
// A little function to check if we have an authorized user and continue on
// redirect to login
const secured = (req, res, next) => {
if (req.user){
return next();
}
res.redirect("/login");
}
/* GET Nuts */
router.get('/', Nuts_controlers.Nuts_view_all_Page );
/* GET detail Nuts page */
router.get('/detail',secured, Nuts_controlers.Nuts_view_one_Page);
/* GET create Nuts page */
router.get('/create',secured, Nuts_controlers.Nuts_create_Page);
/* GET update Nuts page */
router.get('/update', secured,
Nuts_controlers.Nuts_update_Page);
/* GET delete Nuts page */
router.get('/delete',secured, Nuts_controlers.Nuts_delete_Page);
module.exports = router;