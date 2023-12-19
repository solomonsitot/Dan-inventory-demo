const productRoutes = require('./src/routes/Products.js')
require('dotenv').config();
const express = require('express');
const app = express();
app.use('/products', productRoutes);





const port=process.env.PORT || 3000;
app.listen(port,()=>{
  console.log(`connected to port ${port}`);
})