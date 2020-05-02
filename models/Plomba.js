const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let schema = new Schema({
    plomb_name: {type: String, required: true},
    category: {type: String, required: true},
    plomb: {
        ru:{type: String, required: true},
        uk:{type: String, required: true},
        en:{type: String, required: true},
        pl:{type: String, required: true}
    },
    material: {
        ru:{type: String, required: true},
        uk:{type: String, required: true},
        en:{type: String, required: true},
        pl:{type: String, required: true}
    },
    price: {
        ru:{type: String, required: true},
        uk:{type: String, required: true},
        en:{type: String, required: true},
        pl:{type: String, required: true}
    },
    description: {
        ru:{type: Object, required: true},
        uk:{type: Object, required: true},
        en:{type: Object, required: true},
        pl:{type: Object, required: true}
    },
    marker: {
        ru:{type: Object, required: true},
        uk:{type: Object, required: true},
        en:{type: Object, required: true},
        pl:{type: Object, required: true}
    },
    packaging: {
        ru:{type: Object, required: true},
        uk:{type: Object, required: true},
        en:{type: Object, required: true},
        pl:{type: Object, required: true}
    },
    image: [String],
    colors: [String],
    plomb_search: {type: String, required: true},
    link:{type: String, required: true},
    type_plomb:{type: String, required:true}
});


module.exports = mongoose.model('Plombs', schema);