require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.URI);
const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:false
  },
  image:{
    type:String,
    required:false
  },
  category:{
    type:String,
    required:false
  },
  description:{
    type:String,
    required:false
  },
  price:{
    type:String,
    required:false
  },
  amount:{
    type:String,
    required:false
  }
});

const Product = new mongoose.model('Product', productSchema);
module.exports = Product;