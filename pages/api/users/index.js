import jwt from 'jsonwebtoken';

import User from '../../../models/User';

export default async (req, res) => {
  try {
    const { method } = req;
    if (method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
    if (!('authorization' in req.headers)) {
      return res.status(401).send('No authorization token');
    }
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    const user = await User.findById(userId);
    if (user.role !== 'root') {
      return res.status(401).send('Not enough privilages');
    }
    // sort by role
    const users = await User.find({ _id: { $ne: userId } }).sort({
      role: 'asc'
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(403).send('Please log in again.');
  }
};
