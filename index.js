import express from 'express';
import sequelize from './database.js';
import CartItem from './Models/cartItemModel.js';
import Cart from './Models/cartModel.js';
import Product from './Models/productModel.js';
import User from './Models/userModel.js';
import cartRouter from './routes/cartRouter.js';
import productRoute from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';

const app = express();
app.use(express.json());

/*await Product.sync()
    .catch(err => {
        console.log(err);
    })

await User.sync()
    .catch(err => {
        console.log(err);
    })*/
    
//Define associations
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

//await sequelize.sync({force: true}); overrides existing   // create tables in the db from models
await sequelize.sync();     


app.use('/api/users', userRouter)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRouter)


app.listen(5000, () => console.log('Server is running'));