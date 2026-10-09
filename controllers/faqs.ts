import { Request, Response, RequestHandler } from 'express'

import Faqs from '../models/faqs'

import { FaqPayload } from '../interfaces/faqs'

const faqs = new Faqs()

export const createFaq: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const faq: FaqPayload = req.body

    try {
        const result = await faqs.createFaq(faq)
        res.status(201).json(result)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to create FAQ',
            details: message
        })
    }
}

export const readFaqs: RequestHandler = async (
    req: Request,
    res: Response
) => {
    try {
        const rows = await faqs.readFaqs()
        res.status(200).json(rows)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to fetch FAQs',
            details: message
        })
    }
}

export const readFaq: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const faqid = Number(req.params.faqid)

    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' })
        return
    }

    try {
        const row = await faqs.readFaq(faqid)

        if (!row) {
            res.status(404).json({ message: 'FAQ not found' })
            return
        }

        res.status(200).json(row)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to fetch FAQ',
            details: message
        })
    }
}

export const updateFaq: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const faqid = Number(req.params.faqid)
    const faq: FaqPayload = req.body

    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' })
        return
    }

    try {
        const result = await faqs.updateFaq(faqid, faq)

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' })
            return
        }

        res.status(200).json(result)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to update FAQ',
            details: message
        })
    }
}

export const updateFaqState: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const faqid = Number(req.params.faqid)
    const { approved } = req.body as { approved?: unknown }

    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' })
        return
    }

    if (approved !== 'Yes' && approved !== 'No') {
        res.status(400).json({
            message: "The approved field must be either 'Yes' or 'No'"
        })
        return
    }

    try {
        const result = await faqs.updateFaqState(faqid, approved)

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' })
            return
        }

        res.status(200).json(result)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to update FAQ approval status',
            details: message
        })
    }
}

export const deleteFaq: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const faqid = Number(req.params.faqid)

    if (!Number.isInteger(faqid) || faqid <= 0) {
        res.status(400).json({ message: 'Invalid FAQ ID' })
        return
    }

    try {
        const result = await faqs.deleteFaq(faqid)

        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'FAQ not found' })
            return
        }

        res.status(200).json(result)
    } catch (err) {
        const message = err instanceof Error
            ? err.message
            : 'Unknown error'

        res.status(500).json({
            error: 'Failed to delete FAQ',
            details: message
        })
    }
}