import jwt from 'jsonwebtoken';

import { connectDb } from '../../utils/connectDb';

import Order from '../../models/Order';
import Product from '../../models/Product';

connectDb();

export default async (req, res) => {
  try {
    const { method } = req;
    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (!('authorization' in req.headers)) {
      return res.status(401).send('No authorization token.');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    //sorting order history by dates
    const orders = await Order.find({ user: userId })
      .sort({ createdAt: 'desc' })
      .populate({
        path: 'products.product',
        model: 'Product'
      });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    console.status(403).send('Please log in again.');
  }
};
