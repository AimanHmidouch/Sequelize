import { Router } from "express";
import { isAuth } from "../Middlewares.js";
import Product from "../Models/productModel.js";
import User from "../Models/userModel.js";

const cartRouter =Router();

cartRouter.get('/', isAuth, async(req, res) =>{
    const cart = await req.user.getCart()
    res.send(cart);
})

cartRouter.get('/products', isAuth, async(req, res) =>{
    const cart = await req.user.getCart()
    const products = await cart.getProducts();
    res.send(products);
})

//add cart related to user
cartRouter.post('/add', isAuth, async(req, res) => {
    const cart =await req.user.createCart()
    res.send(cart);
})

//add products to the cart
cartRouter.post('/add/:id', isAuth, async(req,res) => {
    const cart = await req.user.getCart();
    const products = await cart.getProducts({where: {id : req.params.id}})
    let product
    if(products.length > 0) {
        product = products[0];
    }
    let newQuantity = 1;
    if(product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity=oldQuantity +1;
        return await cart.addProduct(product, {through: {quantity: newQuantity}})
    }
    Product.findOne({where: {id:req.params.id}});
    const newCart =await cart.addProduct(product, {through: {quantity: newQuantity}})
    res.send(product);
})


export default cartRouter;