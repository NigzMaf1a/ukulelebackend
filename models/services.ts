
// import { query, getConnection } from "../utils/db";
// import {
//   ServicesRow,
//   ServicesPayload,
//   LendingPayload,
//   BookingPayload,
// } from "../interfaces/services";

// export default class ServicesModel {
//   constructor() {}

//   /**
//    * Create a service record and auto-insert Lending or Booking record
//    * Defaults: ServiceStatus = "Pending", PaymentStatus = "Not Paid"
//    */
//   async createService(
//     payload: ServicesPayload
//   ): Promise<{ message: string; serviceID: number }> {
//     const conn = await getConnection();
//     await conn.beginTransaction();
//     try {
//       // Insert into Services
//       const serviceSql = `
//         INSERT INTO Services
//           (CustomerID, Genre, Cost, Hours, ServiceType, ServiceStatus, PaymentStatus)
//         VALUES (?, ?, ?, ?, ?, ?, ?)
//       `;
//       const [serviceResult] = await conn.execute<{ insertId: number }>(serviceSql, [
//         payload.CustomerID,
//         payload.Genre,
//         payload.Cost,
//         payload.Hours,
//         payload.ServiceType,
//         "Pending",
//         "Not Paid",
//       ]);
//       const serviceID = serviceResult.insertId;

//       // Auto insert into Lending or Booking
//       if (payload.ServiceType === "Lending") {
//         const lendingSql = `
//           INSERT INTO Lending
//             (Genre, LendingDate, Cost, Hours, ServiceID, LendingStatus, Performed)
//           VALUES (?, NOW(), ?, ?, ?, ?, ?)
//         `;
//         const lendingData: LendingPayload = {
//           Genre: payload.Genre,
//           LendingDate: new Date(),
//           Cost: payload.Cost,
//           Hours: payload.Hours,
//           ServiceID: serviceID,
//           LendingStatus: "Yet",
//           Performed: "No",
//         };
//         await conn.execute(lendingSql, [
//           lendingData.Genre,
//           lendingData.Cost,
//           lendingData.Hours,
//           lendingData.ServiceID,
//           lendingData.LendingStatus,
//           lendingData.Performed,
//         ]);
//       } else if (payload.ServiceType === "Booking") {
//         const bookingSql = `
//           INSERT INTO Booking
//             (Genre, BookingDate, Cost, Hours, ServiceID, BookStatus, Performed)
//           VALUES (?, NOW(), ?, ?, ?, ?, ?)
//         `;
//         const bookingData: BookingPayload = {
//           Genre: payload.Genre,
//           BookingDate: new Date(),
//           Cost: payload.Cost,
//           Hours: payload.Hours,
//           ServiceID: serviceID,
//           BookStatus: "Untick",
//         };
//         await conn.execute(bookingSql, [
//           bookingData.Genre,
//           bookingData.Cost,
//           bookingData.Hours,
//           bookingData.ServiceID,
//           bookingData.BookStatus,
//           "No",
//         ]);
//       }

//       await conn.commit();
//       conn.release();
//       return { message: "Service created successfully", serviceID };
//     } catch (err) {
//       await conn.rollback();
//       conn.release();
//       throw err;
//     }
//   }

//   /** Fetch all services */
//   async getAllServices(): Promise<ServicesRow[]> {
//     const sql = `SELECT * FROM Services`;
//     return query<ServicesRow>(sql);
//   }

//   /** Fetch single service by ID */
//   async getServiceById(serviceID: number): Promise<ServicesRow | undefined> {
//     const sql = `SELECT * FROM Services WHERE ServiceID = ?`;
//     const rows = await query<ServicesRow>(sql, [serviceID]);
//     return rows[0];
//   }

//   /** Update full service record */
//   async updateService(
//     serviceID: number,
//     data: Partial<ServicesPayload>
//   ): Promise<{ message: string;  }> {
//     const fields = Object.keys(data);
//     if (!fields.length) return { message: "No fields to update"};

//     const setClause = fields.map(f => `${f} = ?`).join(", ");
//     const values = fields.map(f => (data as any)[f]);
//     values.push(serviceID);

//     const sql = `UPDATE Services SET ${setClause} WHERE ServiceID = ?`;
//     const result = await query<{ affectedRows: number }>(sql, values);
//     return { message: "Service updated" };
//   }

//   /** Update service status only */
//   async updateServiceStatus(
//     serviceID: number,
//     status: ServicesRow["ServiceStatus"]
//   ): Promise<{ message: string; }> {
//     const sql = `UPDATE Services SET ServiceStatus = ? WHERE ServiceID = ?`;
//     const result = await query<{ affectedRows: number }>(sql, [status, serviceID]);
//     return { message: "ServiceStatus updated"};
//   }

//   /** Update payment status only */
//   async updatePaymentStatus(
//     serviceID: number,
//     payment: ServicesRow["PaymentStatus"]
//   ): Promise<{ message: string; }> {
//     const sql = `UPDATE Services SET PaymentStatus = ? WHERE ServiceID = ?`;
//     const result = await query<{ affectedRows: number }>(sql, [payment, serviceID]);
//     return { message: "PaymentStatus updated"};
//   }

//   /** Delete service */
//   async deleteService(
//     serviceID: number
//   ): Promise<{ message: string;}> {
//     const sql = `DELETE FROM Services WHERE ServiceID = ?`;
//     const result = await query<{ affectedRows: number }>(sql, [serviceID]);
//     return { message: "Service deleted" };
//   }
// }