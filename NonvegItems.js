const { default: mongoose } = require("mongoose");
const ProductSchema = require("./Schema");


const NonvegItem = mongoose.model("NonvegItem",ProductSchema);

    module.exports = NonvegItem;
