import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

import { connectDb } from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';

connectDb();

/*
1. Check if the user exist
2. IF not, hash the password
3. create new user
3.5 Create a cart for the new user
4. create token for the new user
*/

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    //   Validator
    if (!isLength(name, { min: 3, max: 10 })) {
      return res.status(422).send('Name must be 3-10 characters long.');
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send('Password must be at least 6 characters long.');
    } else if (!isEmail(email)) {
      return res.status(422).send('Email must be valid');
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User with ${email} already exists`);
    } else {
      const hash_password = await bcrypt.hash(password, 10);
      const newUser = await new User({
        name,
        email,
        password: hash_password
      }).save();

      await new Cart({ user: newUser._id }).save();

      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
      });
      res.status(201).json(token);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error signning up! Please try again later.');
  }
};
