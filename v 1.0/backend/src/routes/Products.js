
const cors = require('cors');
const Product= require('../models/db.js');
const express = require('express');
const router= express.Router();
router.use(express.json({limit: '50mb'}));
router.use(express.urlencoded({limit: '50mb', extended: true }));
router.use(cors());

//to insert a new product
router.post('/add',async(req,res)=>{
    const{name,image, category,description,price,amount} = req.body;
    const data={
    name:name,
    image:image,
    category:category,
    description:description,
    price:price,
    amount:amount
    }
    
    await Product.insertMany(data);
    })
    
    
    
    
    //to see products
    router.get('/get', async(req,res)=>{
      try{
    
        const allProducts=await Product.find({});
        res.send(allProducts).status(200);
      }
      catch(err){console.log(err)};
    });
    
    
    //to delete a product
    
    router.delete('/delete/:productId', async(req,res)=>{
      const productId = req.params.productId;
    
      try {
        await Product.findByIdAndDelete(productId);
        res.status(204).end();
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
    
    
    //to edit a product
    router.put('/edit/:Id',async(req,res)=>{
      const productId = req.params.Id;
      try{
        const result= await Product.findById(productId);
      // console.log(result);
      if (req.body.name) {
        result.name = req.body.name;
      }
      if (req.body.image) {
        result.image = req.body.image;
      }
      if (req.body.description) {
        result.description = req.body.description;
      }
      if (req.body.category) {
        result.category = req.body.category;
      }
      if (req.body.price) {
        result.price = req.body.price;
      }
      if (req.body.amount) {
        result.amount = req.body.amount;
      }
      await result.save();
    
      }
      catch(err){
        console.log(err)
      }
    });
    
    router.put('/sell/:Id',async(req,res) => {
      const productId = req.params.Id;
      try{
        const result= await Product.findById(productId);
        result.amount-=req.body.sold;
        await result.save();
      }catch(err){
        console.log(err)
    
      }
    })
    
    
    router.get('/search/:search', async (req, res) => {
      const term = req.params.search;
    
      try {
        const result = await Product.find({ name: { $regex: new RegExp(term, 'i') } });
        res.json(result).status(200);
    
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Internal Server Error');
      }
    });
    
    router.get("/see/:productType",async(req,res) => {
      const productType = req.params.productType;
      try{
        
    const result = await Product.find({category: { $regex: new RegExp(productType, 'i') }});
    res.json(result).status(200);
      }
      catch(err) {
        console.log(err.message)
        res.status(500).send('Internal Server Error');
      }
    });
    
    module.exports = router;
    