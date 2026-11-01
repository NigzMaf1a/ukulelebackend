
import { query, getConnection } from "../utils/db"
import type { FinanceRow, FinancePayload } from "../interfaces/finance"

export default class FinanceModel {
  constructor() { }

  async createFinance(
    data: FinancePayload
  ): Promise<{ message: string; id: number }> {
    const sql = `
            INSERT INTO Finance
                (
                    CustomerID,
                    Name,
                    PhoneNo,
                    TransactionName,
                    TransactionDate,
                    Amount,
                    TransactionStatus,
                    TransactType,
                    ServiceID
                )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING TransactionID
        `

    const rows = await query<{ TransactionID: number }>(sql, [
      data.customerid,
      data.name,
      data.phoneno,
      data.transactionname,
      data.transactiondate,
      data.amount,
      data.transactionstatus,
      data.transacttype,
      data.serviceid
    ])

    return {
      message: "Finance record created",
      id: rows[0].TransactionID
    }
  }

  async readFinance(): Promise<FinanceRow[]> {
    const sql = `SELECT * FROM Finance`
    return await query<FinanceRow>(sql)
  }

  async getFinanceData(transactionID: number): Promise<FinanceRow | undefined> {
    const sql = `SELECT * FROM Finance WHERE TransactionID = $1`
    const rows = await query<FinanceRow>(sql, [transactionID])
    return rows[0]
  }


  async updateFinance(
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const client = await getConnection()

    try {
      await client.query("BEGIN")

      const paymentResult = await client.query<{ serviceid: number | null }>(
        `
                SELECT ServiceID
                FROM Finance
                WHERE TransactionID = $1
                FOR UPDATE
            `,
        [transactionID]
      )

      const payment = paymentResult.rows[0]

      console.log("Approval transaction ID:", transactionID)
      console.log("Raw payment query result:", payment)
      console.log("Retrieved ServiceID:", payment?.serviceid)

      if (!payment) {
        await client.query("ROLLBACK")

        return {
          message: "Finance record not found",
          affectedRows: 0
        }
      }

      const financeResult = await client.query(
        `
                UPDATE Finance
                SET TransactionStatus = 'Approved'
                WHERE TransactionID = $1
                RETURNING TransactionID
            `,
        [transactionID]
      )

      if (payment.serviceid !== null) {
        const serviceResult = await client.query(
          `
                    UPDATE Services
                    SET PaymentStatus = 'Paid'
                    WHERE ServiceID = $1
                `,
          [payment.serviceid]
        )

        if (serviceResult.rowCount === 0) {
          throw new Error(
            `Associated service ${payment.serviceid} was not found`
          )
        }
      }

      await client.query("COMMIT")

      return {
        message: "Payment and associated service approved successfully",
        affectedRows: financeResult.rowCount || 0
      }
    } catch (error) {
      await client.query("ROLLBACK")
      throw error
    } finally {
      client.release()
    }
  }

  async deleteFinance(
    transactionID: number
  ): Promise<{ message: string; affectedRows: number }> {
    const sql = `DELETE FROM Finance WHERE TransactionID = $1`
    const res = await query(sql, [transactionID])

    return {
      message: "Finance record deleted",
      affectedRows: (res as any).rowCount || 0
    }
  }
}
