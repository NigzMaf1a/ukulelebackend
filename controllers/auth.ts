import { RequestHandler } from "express";
import { query } from "../utils/db";
import generateToken from "../utils/generateToken";
import { UserRecord } from "../utils/generateToken";
import bcrypt from "bcryptjs";

/**
 * Represents a user record returned from the database
 */
export interface User extends UserRecord { }

export const login: RequestHandler = async (req, res) => {
  // Accept BOTH camelCase and PascalCase request bodies
  const emailInput = req.body.email ?? req.body.Email;
  const passwordInput = req.body.password ?? req.body.Password;

  // Normalize input
  const email = String(emailInput ?? "").trim().toLowerCase();
  const password = String(passwordInput ?? "").trim();

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password required",
    });
  }

  try {
    const users = await query<UserRecord>(
      `
      SELECT
        regid AS "RegID",
        name AS "Name",
        phoneno AS "PhoneNo",
        email AS "Email",
        password AS "Password",
        gender AS "Gender",
        regtype AS "RegType",
        dlocation AS "dLocation",
        accstatus AS "accStatus",
        photo AS "Photo",
        lastaccessed AS "lastAccessed"
      FROM registration
      WHERE LOWER(email) = $1
      LIMIT 1
      `,
      [email]
    );

    const user = users[0];

    // User not found
    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    console.log("DB user:", user);
    console.log("Input password:", password);
    console.log("Stored password:", user.Password);

    const storedPassword = String(user.Password);
    let passwordMatches = false;

    // Determine whether the stored password is bcrypt or plaintext
    if (/^\$2[aby]\$\d{2}\$/.test(storedPassword)) {
      // bcrypt hash
      passwordMatches = await bcrypt.compare(password, storedPassword);
    } else {
      // Plaintext password (temporary support for admin)
      passwordMatches = password === storedPassword.trim();
    }

    if (!passwordMatches) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Account approval check
    if (user.accStatus !== "Approved") {
      return res.status(403).json({
        error: "Account not approved",
      });
    }

    // Generate JWT token
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
    console.error("Login error:", err);

    return res.status(500).json({
      error: "Server error during login",
    });
  }
};