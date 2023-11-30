const { Double } = require("mongodb")
const mongoose = require("mongoose")
const recipeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [2, "Name must be at least 2 characters"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    size: {
        type: String,
        required: true,
        minlength: [2, "Size must be at least 2 characters"],
        maxlength: [10, "Size cannot exceed 10 characters"]
    },
cost: {
    type: Number,
    required: true,
    min: 0,
    max: 500
}
})
module.exports = mongoose.model("recipe",recipeSchema)

