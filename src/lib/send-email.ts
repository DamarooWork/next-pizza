'use server'
import nodemailer from 'nodemailer'
import React from 'react'
interface Props {
  subject: string
  emailTo: string
  ReactNode: React.ReactNode
}
export async function sendEmail({ ReactNode, subject, emailTo }: Props) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    debug: true, // Включаем отладку
  })
  const ReactDOMServer = (await import('react-dom/server')).default
  const mailOptions = {
    from: `"Next pizza by Damaroo" <${process.env.EMAIL_FROM}>`,
    to: emailTo,
    subject,
    html: ReactDOMServer.renderToStaticMarkup(ReactNode),
  }
  const info = await transporter.sendMail(mailOptions)
  return info
}
