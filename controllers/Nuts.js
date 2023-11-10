var Nuts =require('../models/Nuts');

// List of all Nuts
exports.Nuts_list = function (req, res) {
    res.send('NOT IMPLEMENTED: Nuts list');
};
// for a specific Nuts.
//exports.Nuts_detail = function (req, res) {
    //res.send('NOT IMPLEMENTED: Nuts detail: ' + req.params.id);
//};



// for a specific Costume.
exports.Nuts_detail = async function(req, res) {
console.log("detail" + req.params.id)
try {
result = await Nuts.findById( req.params.id)
res.send(result)
} catch (error) {
res.status(500)
res.send(`{"error": document for id ${req.params.id} not found`);
}
};


// Handle Nuts create on POST.
exports.Nuts_create_post = function (req, res) {
    res.send('NOT IMPLEMENTED: Nuts create POST');
};
// Handle Nuts delete form on DELETE.
exports.Nuts_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Nuts delete DELETE ' + req.params.id);
};
// Handle Nuts update form on PUT.
//exports.Nuts_update_put = function (req, res) {
    //res.send('NOT IMPLEMENTED: Nuts update PUT' + req.params.id);
//};

// Handle Nuts update form on PUT.
exports.Nuts_update_put = async function(req, res) {
console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
try {
let toUpdate = await Nuts.findById( req.params.id)
// Do updates of properties
if(req.body.Nuts)
toUpdate.name = req.body.name;
if(req.body.cost) toUpdate.cost = req.body.cost;
if(req.body.size) toUpdate.size = req.body.size;
let result = await toUpdate.save();
console.log("Sucess " + result)
res.send(result)
} catch (err) {
res.status(500)
res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
}
};

// List of all Nuts
exports.Nuts_list = async function (req, res) {
    try {
        theNuts = await Nuts.find();
        res.send(theNuts);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// VIEWS
// Handle a show all view
exports.Nuts_view_all_Page = async function (req, res) {
    try {
        theNuts = await Nuts.find();
        res.render('Nuts', { title: 'Nuts Search Results', results: theNuts });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle Nuts create on POST.
exports.Nuts_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Nuts();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"Nuts_type":"goat", "cost":12, "size":"large"}
    document.Name = req.body.Name;
    document.cost = req.body.cost;
    document.size = req.body.size;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

    





