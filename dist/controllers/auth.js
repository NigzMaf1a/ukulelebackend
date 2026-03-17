"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const db_1 = require("../utils/db");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
/**
 * Login controller (plaintext passwords)
 */
const login = async (req, res) => {
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
        // Query only required fields for efficiency
        const users = await (0, db_1.query)(`
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
      `, [email]);
        const user = users[0];
        // User not found
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password",
            });
        }
        console.log('DB user:', user);
        console.log('Input password:', password);
        console.log('Stored password:', user.Password);
        // Plaintext password comparison
        if (password !== String(user.Password).trim()) {
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
        const token = (0, generateToken_1.default)(user);
        // Successful login response
        return res.json({
            token,
            user: {
                RegID: user.RegID,
                Email: user.Email,
                RegType: user.RegType,
                accStatus: user.accStatus,
            },
        });
    }
    catch (err) {
        console.error("Login error:", err.message);
        return res.status(500).json({
            error: "Server error during login",
        });
    }
};
exports.login = login;
