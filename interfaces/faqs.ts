import { RowDataPacket } from "mysql2"

export interface FaqPayload {
    email: string
    question: string
    answer?: string
    approved?: 'Yes' | 'No'
}

export interface FaqRow extends RowDataPacket {
    faqid: number
    email: string
    question: string
    answer: string
    approved: 'Yes' | 'No'
}