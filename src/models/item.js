var mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category',
        },
        description: String,
    },
    {
        timestamps: true,
    }
)

itemsSchema.index({ name: 'text' })
var items = mongoose.model('item', itemsSchema)
module.exports = items
