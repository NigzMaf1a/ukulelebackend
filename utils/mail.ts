import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
})

export async function sendFaqAnswer(
    email: string,
    question: string,
    answer: string
): Promise<void> {

    await transporter.sendMail({
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Your FAQ has been answered',
        text: `
Your question has been answered.

Question:
${question}

Answer:
${answer}

Thank you.
        `.trim(),
        html: `
            <div>
                <h2>Your FAQ has been answered</h2>

                <p><strong>Question:</strong></p>
                <p>${question}</p>

                <p><strong>Answer:</strong></p>
                <p>${answer}</p>

                <p>Thank you.</p>
            </div>
        `
    })
}