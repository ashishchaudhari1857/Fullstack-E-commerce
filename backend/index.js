const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const dotenv=require('dotenv')
const sequelize = require('./config/dbconfig');
/// route protectors
const { userCheck, adminCheck } = require('./middlewares/auth');


const ProductRoute = require('./routes/product');
const ReviewRoute = require('./routes/review');
const AuthRoute =require('./routes/authRoute');
const CartRoute=require('./routes/CartRoute');
const ProfileRoute=require('./routes/profileRoute')


const Product = require('./models/product');
const Review = require('./models/review');
const User =require('./models/user')
const Profile =require('./models/profile')
const  Cart =require('./models/cart')
const CartProducts=require('./models/cartProducts')
  
const app = express();
app.use(cookieParser());
dotenv.config();


// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/product', adminCheck , ProductRoute);
app.use('/api/reviews', userCheck  , ReviewRoute);
app.use('/api/auth',  AuthRoute);
app.use('/api/cart', userCheck ,CartRoute);
app.use('/api/profile', userCheck, ProfileRoute);

// Define associations
Product.hasMany(Review, { onDelete: 'CASCADE' }); // Cascade delete reviews when a product is deleted
Review.belongsTo(Product);

User.hasOne(Profile, { onDelete: 'CASCADE' }); 
Profile.belongsTo(User);

User.hasOne(Cart, { onDelete: 'CASCADE' }); 
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartProducts, onDelete: 'CASCADE' }); 
Product.belongsToMany(Cart, { through: CartProducts, onDelete: 'CASCADE' });

// Review.belongsTo(User, { foreignKey: 'UserId', targetKey: 'id' });
// Review.belongsTo(Product, { foreignKey: 'ProductId', targetKey: 'id' });
// Review.addConstraint('unique_review_per_user_product', ['UserId', 'ProductId'], {
//   type: 'unique',
//   name: 'unique_review_per_user_product'
// });

//   we need to create a third party  table for  the  many association\
Cart.belongsToMany(Product,{through:CartProducts});
Product.belongsToMany(Cart,{through:CartProducts})
// Sync the database
sequelize.sync({ force: true }).then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log('Server connected');
  });
}).catch((err) => {
  console.log(err);
});
