const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   name:{
    type:String,
    require:true,
    trim:true,
    maxLength:100
   },
   price:{
    type:Number,
    required:true,
    maxLength:5,
    default:0.0
   },
   description:{
    type:String,
    required:true
   },
   rating:{
    type:Number,
    default:0,
   },
   images:[
      {
        public_id:{
            type:String,
            required:true,
          },
          url:{
            type:String,
            required:true
          },
      }
    ],
    category:{
      type:String,
      required:true,
      enum:{
        values:[
          'Idols and Statues',
          'Puja Accessories',
          'Incense and Dhoop',
          'Puja Books and Scriptures',
          'Devotional Music and Instruments',
          'Rudraksha Beads and Malas',
          'Clothing and Attire',
          'Festival and Seasonal Decor',
          'Prasad and Offerings',
          'Astrology and Vastu Products',
          'Puja Thalis and Accessories',
          'Devotional Books'
        ],
        message: 'Please select correct category for product'
      }
    },
    seller:{
      type:String,
      required:true
    },
    stock: {
      type:Number,
      required:true,
      maxLength:5,
      default:0,
    },
    numOfReviews:{
      type:Number,
      default:0,
    },
    reviews:[
        {
          user:{
            type: mongoose.Schema.ObjectId,
            ref:'User',
            required:true
          },
          name:{
            type:String,
            required:true
          },
          rating:{
            type:Number,
            required:true
          },
          comment:{
            type:String,
            required:true,
          }
        }
    ],
    createdAt:{
      type:Date,
      default:Date.now
    }
})


const Product  = mongoose.models.Product || mongoose.model("Product",productSchema);

module.exports = Product;
