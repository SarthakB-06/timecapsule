import bcrypt from 'bcrypt';
import {User} from '../models/user.model.js'; 
import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';



export const userRegister = AsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
   
    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = bcrypt.hashSync(password, 10);

   
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export const userLogin = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const user = await User.findOne({email})
  
  if (!user ||!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  return res.status(200).json({ message: 'Login successful', token });
})