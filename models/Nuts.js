const mongoose = require("mongoose")
const NutsSchema = mongoose.Schema({
name: String,
cost: Number,
size: String,
})
module.exports = mongoose.model("Nuts",NutsSchema)