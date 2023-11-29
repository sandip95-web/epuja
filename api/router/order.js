const express = require("express");
const orderRouter = express.Router();
const Order = require("../models/order");
const Product = require("../models/product");
const { authMiddleware, authorizeRole } = require("../middleware/auth");

//create a new order
orderRouter.post("/order/new",authMiddleware,async (req, res) => {
 try {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
      } = req.body;
    
      const order  = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt:Date.now(),
        user:req.user._id
      })

      return res.status(200).json({success:true,order});
 } catch (error) {
    res.json({Error:error.message});
 }
});

//get logged in user order
orderRouter.get("/order/me",authMiddleware,async(req,res)=>{
  try {
    const order = await Order.find({user:req.user.id});

  if(order.length  ===  0){
    return res.status(404).json({success:false,message:"NO order found with this ID"});
  }
  return res.status(200).json({success:true,order});
  } catch (error) {
    res.json({Error:error.message});
  }
})

//get single order info
orderRouter.get("/order/:id",authMiddleware,async(req,res)=>{
  try {
  const order = await Order.findById(req.params.id).populate("user","name");
  if(!order){
    return res.status(404).json({success:false,message:"NO order found with this ID"});
  }
  return res.status(200).json({success:true,order});
  } catch (error) {
    res.json({Error:error.message});
  }
})

//Admin routes

//to get all orders
orderRouter.get("/admin/order",authMiddleware,authorizeRole('admin'),async(req,res)=>{
  try {
    const orders=await Order.find();
    let totalAmount = 0;
    orders.forEach(order=>{
      totalAmount+=order.totalPrice;
    })

    return res.status(200).json({success:true,totalAmount,orders});
  } catch (error) {
    
  }
})

//update /Process order 
orderRouter.put("/admin/order/:id",authMiddleware,authorizeRole('admin'),async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id);

  if(order.orderStatus === 'Delivered'){
    return res.status(400).json({message:"You have already delivered this order"});  
  }
  order.orderItems.forEach(async item=>{
     const product = await Product.findById(item.product);
     if(!product){
      return res.status(404).json({message:"Product not found"});
     }
     product.stock = product.stock - item.quantity;
     console.log(product.stock);
     await product.save({validateBeforeSave: false});
     return res.status(200).json({success:true,message:"Successfully updated"});
  })

  order.orderStatus=req.body.status;
  order.deliveredAt = Date.now();
  await order.save();
  } catch (error) {
    res.json({Error:error.message});
  }
})

//delete  the order
orderRouter.delete("/admin/order/delete/:id",authMiddleware,authorizeRole("admin"),async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id);
  if(!order){
    return res.status(200).json({success:false,message:'Order Not found'});
  }
  await order.deleteOne({_id:req.params.id});
  return res.status(200).json({success:true,message:"Order removed successfully"});
  } catch (error) {
   res.json({Error:error.message});    
  }
})

module.exports = orderRouter;
