"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class RegistrationModel {
    constructor() { }
    /**
     * Create a new registration record
     * Automatically inserts into Customer or Member table
     */
    async createRegistration(data) {
        const client = await (0, db_1.getConnection)();
        try {
            await client.query("BEGIN");
            // hash password
            const hashedPassword = await bcryptjs_1.default.hash(data.Password, 10);
            const sql = `
        INSERT INTO Registration
          (Name, PhoneNo, Email, Password, Gender, RegType, dLocation, Photo, accStatus, lastAccessed)
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        RETURNING RegID
      `;
            const result = await client.query(sql, [
                data.Name,
                data.PhoneNo,
                data.Email,
                hashedPassword,
                data.Gender,
                data.RegType,
                data.dLocation,
                data.Photo ?? null,
                data.accStatus ?? "Pending",
                data.lastAccessed ?? new Date(),
            ]);
            const regID = result.rows[0].RegID;
            /**
             * Insert into child tables
             */
            if (data.RegType === "Customer") {
                const customerSql = `
          INSERT INTO Customer
            (RegID, Name, Email, PhoneNo)
          VALUES ($1,$2,$3,$4)
        `;
                await client.query(customerSql, [
                    regID,
                    data.Name,
                    data.Email,
                    data.PhoneNo
                ]);
            }
            else {
                const memberSql = `
          INSERT INTO Member
            (RegID, Type, Name, PhoneNo, PaymentStatus)
          VALUES ($1,$2,$3,$4,$5)
        `;
                await client.query(memberSql, [
                    regID,
                    data.RegType,
                    data.Name,
                    data.PhoneNo,
                    "Not Paid"
                ]);
            }
            await client.query("COMMIT");
            return {
                message: "Registration created successfully",
                regID
            };
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    }
    /**
     * Read all registration records
     */
    async readRegistrations() {
        const sql = `SELECT * FROM Registration`;
        return await (0, db_1.query)(sql);
    }
    /**
     * Get single registration
     */
    async getRegistration(regID) {
        const sql = `SELECT * FROM Registration WHERE RegID = $1`;
        const rows = await (0, db_1.query)(sql, [regID]);
        return rows[0];
    }
    /**
     * Update registration
     */
    async updateRegistration(regID, data) {
        const sql = `
      UPDATE Registration
      SET Name = $1, PhoneNo = $2, Email = $3, Password = $4,
          Gender = $5, RegType = $6, dLocation = $7,
          Photo = $8, accStatus = $9, lastAccessed = $10
      WHERE RegID = $11
    `;
        const res = await (0, db_1.query)(sql, [
            data.Name,
            data.PhoneNo,
            data.Email,
            data.Password,
            data.Gender,
            data.RegType,
            data.dLocation,
            data.Photo ?? null,
            data.accStatus ?? "Pending",
            data.lastAccessed ?? new Date(),
            regID,
        ]);
        return {
            message: "Registration updated",
            affectedRows: res.rowCount || 0
        };
    }
    /**
     * Delete registration
     */
    async deleteRegistration(regID) {
        const sql = `DELETE FROM Registration WHERE RegID = $1`;
        const res = await (0, db_1.query)(sql, [regID]);
        return {
            message: "Registration deleted",
            affectedRows: res.rowCount || 0
        };
    }
}
exports.default = RegistrationModel;
