"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFaqAnswer = sendFaqAnswer;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT) || 587,
    secure: Number(process.env.MAIL_PORT) === 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});
async function sendFaqAnswer(email, question, answer) {
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
    });
}
