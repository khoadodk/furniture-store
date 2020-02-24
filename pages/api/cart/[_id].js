import jwt from 'jsonwebtoken';

import Product from '../../../models/Product';
import Cart from '../../../models/Cart';
import { connectDb } from '../../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    const { method } = req;
    if (method !== 'DELETE') {
      res.setHeader('Allow', ['DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (!('authorization' in req.headers)) {
      return res.status(401).send('No authorization token.');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: req.query._id } } },
      { new: true }
    ).populate({
      path: 'products.product',
      model: 'Product'
    });
    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Please log in again.');
  }
};
