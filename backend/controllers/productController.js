
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js"

//@desc     Fetch all products
//@route    GET /api/Products
//@access    Public
const getProducts = asyncHandler( async(req, res) => {
   
    const products = await Product.find({})
    res.json(products) 
  
})

//@desc     Fetch Single product
//@route    GET /api/Product/:id
//@access    Public
const getProductById = asyncHandler(async (req, res) => {
    const id= req.params.id
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      
        const product = await Product.findById(id)
        if (product) {
            res.json(product)
        } else {
          res.status(404)
          throw new Error('Product not Found')
        }
    }
    else {
      res.status(500)
        throw new Error(`ID: ${id} is not valid ID`)
    }
   
   
})

export {getProductById,getProducts}