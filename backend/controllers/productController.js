
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

//@desc     Delete Product
//@route    delete /api/Products/:id
//@access    Privet/Admin
const deleteProduct = asyncHandler( async(req, res) => {
   
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({message: 'Product removed'})
    } else {
        res.status(404)
        throw new Error('Product not found')
    } 
  
})

//@desc     Create Product
//@route    POST /api/Products
//@access    Privet/ Admin
const createProduct = asyncHandler(async (req, res) => {

      
    // const product = await Product.create({
        // user: req.user._id,
        // price:req.body.price,
        // name: req.body.name,
        // image: req.body.imageUrl,
        // brand: req.body.brand,
        // category: req.body.category,
        // countInStock: req.body.countInStock,
        // numReviews: req.body.numReviews,
        // description: req.body.description,

    //     })
    const product = new Product({
        name: 'sample name',
        price:0,
        user: req.user._id,
        image: "/images/sample.jpg",
        brand: 'Sample brand',
        category: 'sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'sample Description',

    }) 
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
      
})
//@desc     Update Product
//@route    put /api/products/:id
//@access    Privet/ Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body
    const product = await Product.findById(req.params.id)
    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock
      
        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }

});

export {getProductById,getProducts,updateProduct,createProduct,deleteProduct}