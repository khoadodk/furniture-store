import mongoose from 'mongoose';

const { Number, ObjectId } = mongoose.Schema.Types;

const CartSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },
  products: [
    {
      quantity: {
        type: Number,
        default: 1
      },
      product: {
        type: ObjectId,
        ref: 'Product'
      }
    }
  ]
});

//use the existing model or create a new one (ERROR: 'Cannot overwrite `Product` model once compiled.',)
export default mongoose.models.Cart || mongoose.model('Cart', CartSchema);
