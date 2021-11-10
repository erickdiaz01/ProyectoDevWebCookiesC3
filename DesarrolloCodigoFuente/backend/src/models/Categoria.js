const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    name: {
        type: String,
        required: true
    }
}, 
{
    collection: 'categorias'
});

module.exports = model('Categoria', CategoriaSchema);