import jwt from 'jsonwebtoken';

import User from '../../../models/User';

export default async (req, res) => {
  try {
    const { method } = req;
    if (method !== 'PUT') {
      res.setHeader('Allow', ['PUT']);
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

    const { _id } = req.query;
    const { role } = req.body;
    await User.findByIdAndUpdate({ _id }, { role });
    res.status(203).send('User updated.');
  } catch (error) {
    console.error(error);
    res.status(403).send('Please log in again.');
  }
};
