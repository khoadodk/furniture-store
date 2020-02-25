import { connectDb } from '../../utils/connectDb';
import Product from '../../models/Product';

connectDb();

export default async (req, res) => {
  const { page, size, searchQuery } = req.query;
  //Convert querystring values to number
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];

  const totalDocs = await Product.countDocuments(); //23 products
  const totalPages = Math.ceil(totalDocs / pageSize); // size = 10 so totalPages are 3

  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }

  //Search Page
  if (searchQuery) {
    products = await Product.find({
      name: { $regex: searchQuery, $options: 'i' }
    });
  }

  res.status(200).json({ products, totalPages });
};
