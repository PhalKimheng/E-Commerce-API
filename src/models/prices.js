const mongoose = require('mongoose')
const Schema = mongoose.Schema

const priceSchema = new mongoose.Schema(
    {
        price: Number,
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Products',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Prices = mongoose.model('prices', priceSchema)
module.exports = Prices
