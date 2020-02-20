import { connectDb } from '../../../utils/connectDb';
import Product from '../../../models/Product';

connectDb();

export default async (req, res) => {
  const product = await Product.findById(req.query._id);
  res.status(200).json(product);
};
