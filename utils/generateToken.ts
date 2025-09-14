import jwt from 'jsonwebtoken';

export interface UserRecord {
  RegID: number;
  Name1: string;
  Name2: string;
  PhoneNo: string;
  Email: string;
  Gender: 'Male' | 'Female';
  RegType: "Customer" | "Manager" | "Accountant" | "Waiter" | "Chef" | "Owner" | "Admin" ;
  dLocation?: string;
  accStatus: 'Pending' | 'Approved' | 'Inactive';
  UserImage?: string;
  lastAccessed: string;
}

// ---- Payload stored in JWT ----
export interface TokenPayload {
  id: number; // user.RegID
  role: UserRecord['RegType']; // user.RegType
}

// ---- Generate JWT ----
function generateToken(user: UserRecord): string {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const payload: TokenPayload = {
    id: user.RegID,
    role: user.RegType,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

export default generateToken;
