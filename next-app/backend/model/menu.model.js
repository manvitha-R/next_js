const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let menuSchema = new Schema({
    menu_name: {
        type: String
    },
    
    isdeleted: {
        type: Boolean,
        default: false
    },
},
{
    collection: 'menu'
}
);
module.exports = mongoose.model('MenuSchema', menuSchema)