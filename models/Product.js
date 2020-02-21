import mongoose from 'mongoose';
import shortId from 'shortid';
const { String, Number } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    sku: {
      type: String,
      unique: true,
      default: shortId.generate()
    },
    description: {
      type: String,
      required: true
    },
    mediaUrl: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

//use the existing model or create a new one (ERROR: 'Cannot overwrite `Product` model once compiled.',)
export default mongoose.models.Product ||
  mongoose.model('Product', ProductSchema);
