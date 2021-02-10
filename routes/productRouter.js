import { Router } from "express";
import { isAuth } from "../Middlewares.js";
import Product from "../Models/productModel.js";

const productRoute = Router()

productRoute.get('/', async (req, res) => {
    const products = await Product.findAll()
    res.send(products);
})

productRoute.get('/:id', async (req, res) =>{
    const produit = await Product.findAll({where: {id : req.params.id}});
    res.send(produit);
})

/*productRoute.post('/add', isAuth, async (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    try {
        const product = await Product.create({
        title,
        imageUrl,
        price,
        description,
        userId: req.user.id
        })
        res.send({product});
    } catch (error) {
        res.send(error)
    }
})*/

productRoute.post('/add', isAuth, async (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    try {
        const product = await req.user.createProduct({
        title,
        imageUrl,
        price,
        description,
        })
        res.send({product});
    } catch (error) {
        res.send(error)
    }
})

productRoute.put('/update/:id', async (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    try {
        const produit = await Product.findAll({where: {id : req.params.id}});
        const product = produit[0]
        product.title = title || product.title
        product.imageUrl = imageUrl || product.imageUrl
        product.price = price || product.price;
        product.description= description || product.description

        const updatedProduct = await product.save();

        res.send(updatedProduct);
    } catch (error) {
        res.send(error);
    }
});

productRoute.delete('/delete/:id', async (req, res) => {
    try{
        const product = await Product.findOne({where: {id:req.params.id}}).catch(e => {
            console.log(e.message)
        });
        if (!product){
           res.send("Product doesnt exist");
        }
        product.destroy();
        res.send("Product Deleted")
    } catch(err) {
        res.send(err);
    }
})

export default productRoute;