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
            payload.customerid,
            payload.genre,
            payload.cost,
            payload.hours,
            payload.servicetype,
            "Pending",
            "Not Paid",
        ]);
        const serviceID = serviceRows[0].ServiceID;
        // Auto-insert into Lending or Booking
        if (payload.servicetype === "Lending") {
            const lendingSql = `
        INSERT INTO Lending
          (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
            const lendingData = {
                genre: payload.genre,
                lendingdate: new Date(),
                cost: payload.cost,
                hours: payload.hours,
                serviceid: serviceID,
                lendingstatus: "Yet",
                performed: "No",
            };
            await (0, db_1.query)(lendingSql, [
                lendingData.genre,
                lendingData.cost,
                lendingData.hours,
                lendingData.serviceid,
                lendingData.lendingstatus,
                lendingData.performed,
            ]);
        }
        else if (payload.servicetype === "Booking") {
            const bookingSql = `
        INSERT INTO Booking
          (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus, Performed)
        VALUES ($1, NOW(), $2, $3, $4, $5, $6)
      `;
            const bookingData = {
                genre: payload.genre,
                bookingdate: new Date(),
                cost: payload.cost,
                hours: payload.hours,
                serviceid: serviceID,
                bookstatus: "Untick",
                performed: "No"
            };
            await (0, db_1.query)(bookingSql, [
                bookingData.genre,
                bookingData.cost,
                bookingData.hours,
                bookingData.serviceid,
                bookingData.bookstatus,
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
    async updateServiceStatus(serviceID) {
        const sql = `
    UPDATE Services
    SET ServiceStatus = 'Approved'
    WHERE ServiceID = $1
  `;
        await (0, db_1.query)(sql, [serviceID]);
        return {
            message: "Service status updated"
        };
    }
    /** Update payment status only */
    async updatePaymentStatus(serviceID) {
        const sql = `
    UPDATE Services
    SET PaymentStatus = 'Paid'
    WHERE ServiceID = $1
  `;
        await (0, db_1.query)(sql, [serviceID]);
        return {
            message: "Payment status updated"
        };
    }
    /** Delete service */
    async deleteService(serviceID) {
        const sql = `DELETE FROM Services WHERE ServiceID = $1`;
        await (0, db_1.query)(sql, [serviceID]);
        return { message: "Service deleted" };
    }
}
exports.default = ServicesModel;
