// login.ts
import { RequestHandler } from "express";
import { query } from "../utils/db";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { QueryResultRow } from "pg";

export interface User extends QueryResultRow {
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
  accStatus: "Pending" | "Approved" | "Inactive";
  Photo?: string;
  lastAccessed: string;
}

export const login: RequestHandler = async (req, res) => {
  const { Email, Password } = req.body;

  const trimmedEmail = String(Email || "").trim();
  const trimmedPassword = String(Password || "").trim();

  if (!trimmedEmail || !trimmedPassword) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const users = await query<User>(
      "SELECT * FROM registration WHERE Email = $1",
      [trimmedEmail]
    );

    const user = users[0];

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Try hashed password comparison first
    let isMatch = false;

    try {
      isMatch = await bcrypt.compare(trimmedPassword, String(user.Password));
    } catch {
      isMatch = false;
    }

    // Fallback for plaintext passwords
    if (!isMatch && trimmedPassword === user.Password) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 🔒 Account approval check
    if (user.accStatus !== "Approved") {
      return res.status(403).json({
        error: "Account not approved",
      });
    }

    const token = generateToken(user);

    return res.json({
      token,
      user: {
        RegID: user.RegID,
        Email: user.Email,
        RegType: user.RegType,
        accStatus: user.accStatus,
      },
    });
  } catch (err) {
    console.error("Login error:", (err as Error).message);

    return res.status(500).json({
      error: "Server error during login",
    });
  }
};