const price = require("../models/prices")

const findById = async (id) => {
  try {
    const Price = await price.findById(id)
    return {
      success: true,
      data: Price
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const findAll = async ()=>{
  try {
    const prices = await price.find()
    return {
      success: true,
      data: prices
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const create = async (newItem) => {
  console.log(newItem);
  try {
    const prices = await price.create(newItem)
    return {
      success: true,
      data: prices
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }
}

const update = async (item_id, newItem) => {
  try{
    const prices = await price.findById(item_id)
    prices.price = newItem.price
    await prices.save()
    return {
      success: true,
      data: prices
    };
  } catch (err) {
    return {
      success: false,
      error: err.message
    }
  }

}

const remove = async (item_id) => {
  try{
    await price.deleteOne({ _id:item_id})
    return {
      success : true,
      data : "price deleted"
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