import { RequestHandler } from 'express'
import pool from '../utils/db'
import generateToken from '../utils/generateToken'
import bcrypt from 'bcryptjs'


export interface User {
  RegID: number;         
  Name: string;                         
  PhoneNo: string;
  Email: string;
  Password: string;
  Gender: "Male" | "Female";
  RegType:
    | "Customer"
    | "DJ"
    | "Mcee"
    | "Storeman"
    | "Accountant"
    | "Dispatchman"
    | "Inspector"
    | "Band"
    | "Admin"
    | "Supplier";
  dLocation?: string;     
  accStatus: 'Pending' | 'Approved' |'Inactive';
  Photo?: string; 
  lastAccessed: string;    
}

export const login: RequestHandler = async (req, res) => {
  const { Email, UserPassword } = req.body;
  const trimmedEmail = String(Email).trim();
  const trimmedPassword = String(UserPassword).trim();

  console.log('For starters......')

  if (!trimmedEmail || !trimmedPassword) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  try {
    const [rows] = await pool.query('SELECT * FROM registration WHERE Email = ?', [trimmedEmail]);
    const users = rows as User[];

    const user = users[0];
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const isMatch = await bcrypt.compare(trimmedPassword, String(user.Password));
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }
    console.log('Almost there')

    const token = generateToken(user);
    console.log(`Token: ${token}`);

    res.json({
      token,
      user: {
        RegID: user.RegID,
        Email: user.Email,
        RegType: user.RegType
      }
    });
  } catch (err) {
    console.error('Login error:', (err as Error).message);
    res.status(500).json({ error: 'Server error during login' });
  }
}
