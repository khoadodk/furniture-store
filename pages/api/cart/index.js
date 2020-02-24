import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import { connectDb } from '../../../utils/connectDb';

const { ObjectId } = mongoose.Types;

connectDb();

export default async (req, res) => {
  try {
    if (!('authorization' in req.headers)) {
      return res.status(401).send('No authorization token');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.userId = userId;
    const { method } = req;
    switch (method) {
      case 'GET':
        await handleGetRequest(req, res);
        break;
      case 'PUT':
        await handlePutRequest(req, res);
        break;
      default:
        res.setHeader('Allow', ['GET', 'PUT']);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again.');
  }
};

const handleGetRequest = async ({ userId }, res) => {
  try {
    const cart = await Cart.findOne({ user: userId }).populate({
      path: 'products.product',
      model: 'Product'
    });

    res.status(200).json(cart.products);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again.');
  }
};

const handlePutRequest = async ({ userId, body }, res) => {
  try {
    const { quantity, productId } = body;
    const cart = await Cart.findOne({ user: userId });
    const productExists = cart.products.some(document =>
      ObjectId(productId).equals(document.product)
    );
    if (productExists) {
      await Cart.findOneAndUpdate(
        { _id: cart._id, 'products.product': productId },
        {
          $inc: {
            'products.$.quantity': quantity
          }
        }
      );
    } else {
      const newProduct = { quantity, product: productId };
      await Cart.findOneAndUpdate(
        { _id: cart._id },
        { $addToSet: { products: newProduct } }
      );
    }
    res.status(200).send('Cart updated.');
  } catch (error) {
    console.error(error);
    res.status(403).send('Please login again.');
  }
};
