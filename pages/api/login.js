import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { connectDb } from '../../utils/connectDb';
import User from '../../models/User';

connectDb();

/*
1. Check if the user exist
2. IF not, return error
3. Check if user's password match
4. create token for the user
*/

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      res.status(422).send(`User with ${email} does not exist`);
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        res.status(422).send(`Email/Password does not match`);
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });
      res.status(201).json(token);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error logging in! Please try again later.');
  }
};
