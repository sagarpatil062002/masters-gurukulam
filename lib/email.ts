import nodemailer from 'nodemailer'

const isServer = typeof window === 'undefined'

const transporter = isServer ? nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
}) : null

export const sendEmail = async (to: string, subject: string, html: string) => {
  if (!isServer || !transporter) {
    console.warn('Email sending is only available on the server side')
    return { success: false, error: 'Server-side only' }
  }

  try {
    const info = await transporter.sendMail({
      from: `"Master's Gurukulam" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    })
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

export const sendContactEmail = async (contactData: {
  name: string
  email: string
  phone: string
  message: string
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">New Contact Form Submission</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Name:</strong> ${contactData.name}</p>
        <p><strong>Email:</strong> ${contactData.email}</p>
        <p><strong>Phone:</strong> ${contactData.phone}</p>
        <p><strong>Message:</strong></p>
        <p style="background: white; padding: 10px; border-radius: 4px;">${contactData.message}</p>
      </div>
      <p style="color: #666; font-size: 12px;">This message was sent from the Master's Gurukulam website contact form.</p>
    </div>
  `

  return await sendEmail(
    process.env.ADMIN_EMAIL || 'admin@mastersgurukulam.com',
    'New Contact Form Submission',
    html
  )
}

export const sendExamRegistrationEmail = async (registrationData: {
  name: string
  email: string
  examTitle: string
  rollNumber?: string
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">Exam Registration Confirmation</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${registrationData.name},</p>
        <p>Your registration for <strong>${registrationData.examTitle}</strong> has been successfully received.</p>
        ${registrationData.rollNumber ? `<p><strong>Roll Number:</strong> ${registrationData.rollNumber}</p>` : ''}
        <p>You will receive your admit card via email before the exam date.</p>
        <p>Best regards,<br>Master's Gurukulam Team</p>
      </div>
    </div>
  `

  return await sendEmail(registrationData.email, 'Exam Registration Confirmation', html)
}

export const sendResultEmail = async (resultData: {
  name: string
  email: string
  examTitle: string
  score: number
  status: string
  resultLink?: string
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">Exam Results Published</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${resultData.name},</p>
        <p>Results for <strong>${resultData.examTitle}</strong> have been published.</p>
        <p><strong>Score:</strong> ${resultData.score}/100</p>
        <p><strong>Status:</strong> ${resultData.status}</p>
        ${resultData.resultLink ? `<p><a href="${resultData.resultLink}" style="background: #1e3a8a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">View Detailed Result</a></p>` : ''}
        <p>Best regards,<br>Master's Gurukulam Team</p>
      </div>
    </div>
  `

  return await sendEmail(resultData.email, 'Exam Results Published', html)
}

export const sendAdmitCardEmail = async (admitCardData: {
  name: string
  email: string
  examTitle: string
  examDate: string
  examTime: string
  venue: string
  rollNumber: string
  admitCardLink?: string
}) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e3a8a;">Admit Card - ${admitCardData.examTitle}</h2>
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${admitCardData.name},</p>
        <p>Your admit card for <strong>${admitCardData.examTitle}</strong> is ready.</p>

        <div style="background: white; padding: 15px; border-radius: 4px; margin: 15px 0;">
          <p><strong>Roll Number:</strong> ${admitCardData.rollNumber}</p>
          <p><strong>Exam Date:</strong> ${admitCardData.examDate}</p>
          <p><strong>Exam Time:</strong> ${admitCardData.examTime}</p>
          <p><strong>Venue:</strong> ${admitCardData.venue}</p>
        </div>

        ${admitCardData.admitCardLink ? `<p><a href="${admitCardData.admitCardLink}" style="background: #1e3a8a; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Download Admit Card</a></p>` : ''}

        <p style="color: #d32f2f; font-weight: bold;">Important: Please bring this admit card and a valid ID proof to the exam center.</p>

        <p>Best regards,<br>Master's Gurukulam Team</p>
      </div>
    </div>
  `

  return await sendEmail(admitCardData.email, `Admit Card - ${admitCardData.examTitle}`, html)
}