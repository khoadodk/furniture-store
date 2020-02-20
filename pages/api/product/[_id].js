import { connectDb } from '../../../utils/connectDb';
import Product from '../../../models/Product';

connectDb();

export default async (req, res) => {
  const { method } = req;
  switch (method) {
    case 'GET':
      await handleGetRequest(req, res);
      break;
    case 'DELETE':
      await handleDeleteRequest(req, res);
      break;
    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

const handleGetRequest = async (req, res) => {
  const product = await Product.findById(req.query._id);
  res.status(200).json(product);
};

const handleDeleteRequest = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.query._id);
    res.status(204).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting product');
  }
};
