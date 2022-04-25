
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js"

//@desc     Create new Order
//@route    POST /api/orders
//@access    Privete
 const addOrderItems = asyncHandler( async(req, res) => {
   
    const { orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
     } = req.body;
     
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')

    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });
        const createdOrder = await order.save()
      
        res.status(201).json(createdOrder);
    };
 
    
  
 })

 //@desc     get Order
//@route    POST /api/orders/:id
//@access    Privete
const getOrderById = asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id).populate('user','name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
    }
    })
 //@desc     Update Order to paid
//@route    POST /api/orders/:id/paid
//@access    Privete
const updateOrderToPaid = asyncHandler( async(req, res) => {
    const order = await Order.findById(req.params.id)
    if (order) {
        order.isPayd = true
        order.paydAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updat_time: req.body.update_time,
            email_address:req.body.payer.email_address
        }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order Not Found')
}
})

export { addOrderItems, getOrderById,updateOrderToPaid }