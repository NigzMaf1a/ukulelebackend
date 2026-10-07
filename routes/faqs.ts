import express from 'express'

import {
    createFaq,
    readFaqs,
    readFaq,
    updateFaq,
    deleteFaq
} from '../controllers/faqs'

const router = express.Router()

router.post('/add', createFaq)

router.get('/get', readFaqs)

router.get('/get/:faqid', readFaq)

router.put('/update/:faqid', updateFaq)

router.delete('/delete/:faqid', deleteFaq)

export default router