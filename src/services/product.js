const Products = require("../models/product")
const mongoose = require('mongoose')

const findById = async (id) => {
  try {
    const product = await Products.findById(id)
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

// const findAll = async (category = '', item = '') => {
//   let matchCond = {};
//   console.log(category);
//   if(category) matchCond['category'] = new mongoose.Types.ObjectId(category)
//   if(item) matchCond['item'] = new mongoose.Types.ObjectId(item)
//   console.log(matchCond);
//   const products = await Products.aggregate([
//     {
//       "$match": matchCond
//     },
//     {
//       $lookup: {
//         from: "price",
//         localField: "_id",
//         foreignField: "product",
//         as: "prices"
//       },

//     },
//     {
//       $lookup: {
//         from: "categories",
//         localField: "category",
//         foreignField: "_id",
//         as: "category"
//       },
//     },
//     {

//       $lookup: {
//         from: "items",
//         localField: "item",
//         foreignField: "_id",
//         as: "item"
//       }
//     },
//     { "$unwind": "$category" },
//     { "$unwind": "$item" },
//   ])

//   if (!products?.length)
//     return []

//   return products
// }
const findAll = async () => {
  // to do
  try {
    const products = await Products.find().populate('category').populate('item')
    if (!Products) throw new Error('Product not found')
    return {
      success: true,
      data: products
    };
  } catch (error) {
    return { error: error.message, data: null }
  }
}

const create = async (newProduct) => {
  try {
    const product = await Products.create(newProduct)
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const update = async (id, newProduct) => {
  try {
    const product = await Products.findById(id)
    product.title = newProduct.title
    product.price = newProduct.price
    product.category = newProduct.category
    product.item = newProduct.item
    await product.save()
    return {
      success: true,
      data: product
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const remove = async (id) => {
  try{
    await Products.deleteOne({_id:id})
    return {
      success : true,
      data : "product deleted"
    }
  }catch(err){
    return {
      success : false,
      err : err.message
    }
  }
}

module.exports = {
  findById,
  update,
  remove,
  findAll,
  create
}