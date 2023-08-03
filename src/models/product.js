var mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new mongoose.Schema(
    {
        name: String,
        price: Number,
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        item: {
            type: Schema.Types.ObjectId,
            ref: 'item',
        },
        imageUrl: String,
        desc: String,
    },
    {
        timestamps: true,
    }
)

productSchema.index({ title: 'text' })
var product = mongoose.model('Products', productSchema)
module.exports = product
