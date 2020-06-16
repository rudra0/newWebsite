import express from 'express'
import Product from '../models/productModel'
import { getToken, isAuth, isAdmin } from '../util';


const router = express.Router();



router.get("/", async(req, res)=>{
    const product = await Product.find( {} );
    
    res.send(product);
})

router.get("/:id", async(req, res)=>{
    const productId = req.params.id
    const product = await Product.findOne( { _id : productId} );
    
    if(product)
    {
        res.send(product);
    }
    else
    {
        res.send(404).status({message:"Product Not Found "})
    }
   
})

router.delete("/:id", isAuth, isAdmin, async( req, res)=>{
    const deletedProduct = await Product.findById(req.params.id)
    if(deletedProduct)
    {
        await deletedProduct.remove()
        res.send({ message: "Product Deleted"});
    }
    res.send("Error In Deleting Product")
})

router.post("/", isAuth, isAdmin, async(req, res)=>{
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        image: req.body.image,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,

    });
    const newProduct = await product.save();

    if(newProduct)
    {
        return res.status(201).send({ msg: 'New Product Created', data: newProduct});
    }
    else
    {
        return res.status(500).send({ msg: "Error In Created Product" });
    }
})


router.put("/:id", isAuth, isAdmin, async(req, res)=>{
    const productId = req.params.id;
    const product = await Product.findById( productId );
    
    
    if(product)
    { 
        
        product.name =req.body.name;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.image = req.body.image;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        product.rating = req.body.rating;
        product.numReviews = req.body.numReviews;

        const updatedProduct = await product.save();
        if(updatedProduct)
        {
            return res.status(200).send({ msg: 'Product Updated', data: updatedProduct});
        }

    }
    
        return res.status(500).send({ msg: "Error In Updating Product" });
    
})
export default router;