import { query } from '../utils/db'

import { FaqRow, FaqPayload } from '../interfaces/faqs'

import { sendFaqAnswer } from '../utils/mail'

export default class Faqs {

    constructor() { }

    async createFaq(data: FaqPayload): Promise<{ message: string; affectedRows: number }> {

        const sql = `
            INSERT INTO faqs
                (email, question, answer, approved)
            VALUES ($1, $2, $3, $4)
        `

        const res = await query(sql, [
            data.email,
            data.question,
            data.answer ?? '',
            data.approved ?? 'No'
        ])

        return {
            message: 'FAQ created successfully',
            affectedRows: (res as any).rowCount || 0
        }
    }

    async readFaqs(): Promise<FaqRow[]> {

        const sql = `
            SELECT *
            FROM faqs
            ORDER BY faqid ASC
        `

        return await query<FaqRow>(sql)
    }

    async readFaq(faqid: number): Promise<FaqRow | undefined> {

        const sql = `
            SELECT *
            FROM faqs
            WHERE faqid = $1
        `

        const rows = await query<FaqRow>(sql, [faqid])

        return rows[0]
    }

    async updateFaq(
        faqid: number,
        data: FaqPayload
    ): Promise<{ message: string; affectedRows: number }> {

        const sql = `
            UPDATE faqs
            SET email = $1,
                question = $2,
                answer = $3,
                approved = $4
            WHERE faqid = $5
        `

        const res = await query(sql, [
            data.email,
            data.question,
            data.answer ?? '',
            data.approved ?? 'No',
            faqid
        ])

        const affectedRows = (res as any).rowCount || 0

        if (affectedRows > 0 && data.answer?.trim()) {
            await sendFaqAnswer(
                data.email,
                data.question,
                data.answer
            )
        }

        return {
            message: 'FAQ updated successfully',
            affectedRows
        }
    }

    async deleteFaq(
        faqid: number
    ): Promise<{ message: string; affectedRows: number }> {

        const sql = `
            DELETE FROM faqs
            WHERE faqid = $1
        `

        const res = await query(sql, [faqid])

        return {
            message: 'FAQ deleted successfully',
            affectedRows: (res as any).rowCount || 0
        }
    }
}