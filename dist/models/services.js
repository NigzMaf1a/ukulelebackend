"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../utils/db");
class ServicesModel {
    constructor() { }
    /**
     * Create a service record and auto-insert Lending or Booking record
     */
    async createService(payload) {
        // Insert into Services table
        const serviceSql = `
      INSERT INTO Services
        (CustomerID, Genre, Cost, Hours, ServiceType, ServiceStatus, PaymentStatus)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING ServiceID
    `;
        const serviceRows = await (0, db_1.query)(serviceSql, [
            payload.CustomerID,
            payload.Genre,
            payload.Cost,
            payload.Hours,
            payload.ServiceType,
            "Pending",
            "Not Paid",
        ]);
        const serviceID = serviceRows[0].ServiceID;
        // Auto-insert into Lending or Booking
        if (payload.ServiceType === "Lending") {
            const lendingSql = `
        INSERT INTO Lending
          (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
            const lendingData = {
                Genre: payload.Genre,
                LendingDate: new Date(),
                Cost: payload.Cost,
                Hours: payload.Hours,
                ServiceID: serviceID,
                LendingStatus: "Yet",
                Performed: "No",
            };
            await (0, db_1.query)(lendingSql, [
                lendingData.Genre,
                lendingData.Cost,
                lendingData.Hours,
                lendingData.ServiceID,
                lendingData.LendingStatus,
                lendingData.Performed,
            ]);
        }
        else if (payload.ServiceType === "Booking") {
            const bookingSql = `
        INSERT INTO Booking
          (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
            const bookingData = {
                Genre: payload.Genre,
                BookingDate: new Date(),
                Cost: payload.Cost,
                Hours: payload.Hours,
                ServiceID: serviceID,
                BookStatus: "Untick",
            };
            await (0, db_1.query)(bookingSql, [
                bookingData.Genre,
                bookingData.Cost,
                bookingData.Hours,
                bookingData.ServiceID,
                bookingData.BookStatus,
                "No",
            ]);
        }
        return { message: "Service created successfully", serviceID };
    }
    /** Fetch all services */
    async getAllServices() {
        const sql = `SELECT * FROM Services`;
        return (0, db_1.query)(sql);
    }
    /** Fetch single service by ID */
    async getServiceById(serviceID) {
        const sql = `SELECT * FROM Services WHERE ServiceID = $1`;
        const rows = await (0, db_1.query)(sql, [serviceID]);
        return rows[0];
    }
    /** Update full service record */
    async updateService(serviceID, data) {
        const fields = Object.keys(data);
        if (!fields.length)
            return { message: "No fields to update" };
        const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
        const values = fields.map((f) => data[f]);
        values.push(serviceID);
        const sql = `UPDATE Services SET ${setClause} WHERE ServiceID = $${values.length}`;
        await (0, db_1.query)(sql, values);
        return { message: "Service updated" };
    }
    /** Update service status only */
    async updateServiceStatus(serviceID, status) {
        const sql = `UPDATE Services SET ServiceStatus = $1 WHERE ServiceID = $2`;
        await (0, db_1.query)(sql, [status, serviceID]);
        return { message: "ServiceStatus updated" };
    }
    /** Update payment status only */
    async updatePaymentStatus(serviceID, payment) {
        const sql = `UPDATE Services SET PaymentStatus = $1 WHERE ServiceID = $2`;
        await (0, db_1.query)(sql, [payment, serviceID]);
        return { message: "PaymentStatus updated" };
    }
    /** Delete service */
    async deleteService(serviceID) {
        const sql = `DELETE FROM Services WHERE ServiceID = $1`;
        await (0, db_1.query)(sql, [serviceID]);
        return { message: "Service deleted" };
    }
}
exports.default = ServicesModel;
