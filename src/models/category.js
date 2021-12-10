const { Schema, model } = require("mongoose");
const categorySchema = new Schema({
    name: String,
    color_primary: String,
    color_secondary: String,
    icono: String
});

module.exports = model('Category', categorySchema)