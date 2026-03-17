import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface LeadData {
  name: string
  email: string
  phone: string
  experience: string
  career_goal: string
  course_type: "ml-ai" | "prompt-engineering"
  created_at?: Date
}

interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

// ─────────────────────────────────────────────
// Transporter (Singleton)
// ─────────────────────────────────────────────

let transporter: Transporter | null = null

function createTransporter(): Transporter {
  if (transporter) return transporter

  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !port || !user || !pass) {
    throw new Error("SMTP configuration missing in environment variables.")
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false, // 🔥 FIXES SELF-SIGNED CERT ERROR ON VERCEL
    },
  })

  return transporter
}

// ─────────────────────────────────────────────
// Core Send Function (NO SILENT FAIL)
// ─────────────────────────────────────────────

async function sendEmail(options: EmailOptions): Promise<boolean> {
  const transport = createTransporter()

  const from =
    options.from ||
    `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`

  try {
    const info = await transport.sendMail({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })

    console.log("✅ EMAIL SENT:", info.response)
    return true
  } catch (error: any) {
    console.error("❌ EMAIL ERROR:", error)
    throw error
  }
}

// ─────────────────────────────────────────────
// Admin Notification Email
// ─────────────────────────────────────────────

export async function sendAdminNotification(
  lead: LeadData
): Promise<boolean> {
  const courseNames = {
    "ml-ai": "Machine Learning & AI",
    "prompt-engineering": "Prompt Engineering Program",
  }

  const courseName = courseNames[lead.course_type]

  const html = `
    <h2>New Course Application – ${courseName}</h2>
    <p><strong>Name:</strong> ${lead.name}</p>
    <p><strong>Email:</strong> ${lead.email}</p>
    <p><strong>Phone:</strong> ${lead.phone}</p>
    <p><strong>Experience:</strong> ${lead.experience}</p>
    <p><strong>Career Goal:</strong> ${lead.career_goal}</p>
  `

  return sendEmail({
    to: process.env.ADMIN_EMAIL || "",
    subject: `New Course Application – ${courseName}`,
    html,
  })
}

// ─────────────────────────────────────────────
// User Confirmation Email
// ─────────────────────────────────────────────

export async function sendUserConfirmation(
  lead: LeadData
): Promise<boolean> {
  const courseNames = {
    "ml-ai": "Machine Learning & AI Program",
    "prompt-engineering": "Prompt Engineering Program",
  }

  const courseName = courseNames[lead.course_type]

  const html = `
  <html>
  <body style="font-family: Arial, sans-serif; background:#f5f7fb; padding:40px;">
    <div style="max-width:600px; background:#ffffff; padding:40px; border-radius:10px;">
      
      <h2>Hi ${lead.name},</h2>

      <p>
        Thank you for applying to the <strong>${courseName}</strong> at 
        <strong>AIsprint</strong>. We have successfully received your application 
        and our Admissions Team is reviewing your profile.
      </p>

      <h3>What Happens Next?</h3>

      <ul>
        <li>Profile review by our <strong>AI Career Experts</strong></li>
        <li>Personalized career counseling session</li>
        <li>Program guidance and enrollment support</li>
      </ul>

      <p>
        We will be in touch shortly with the next steps. 
        For any queries, feel free to contact our Admissions Team.
      </p>

      <p>
        Regards,<br/>
        <strong>AIsprint Admissions Team</strong>
      </p>

    </div>
  </body>
  </html>
  `

  return sendEmail({
    to: lead.email,
    subject: `Application Received – ${courseName} | AIsprint`,
    html,
  })
}

// ─────────────────────────────────────────────
// Signup Confirmation Email
// ─────────────────────────────────────────────

export async function sendSignupConfirmation(user: {
  name: string
  email: string
}): Promise<boolean> {
  const html = `
  <html>
  <body style="font-family: Arial, sans-serif; background:#f5f7fb; padding:40px;">
    <div style="max-width:600px; background:#ffffff; padding:40px; border-radius:10px;">
      <h2>Hi ${user.name},</h2>
      <p>Thank you for creating an account with <strong>AIsprint</strong>!</p>
      <p>Your profile has been successfully created and you can now access the dashboard to manage your courses and profile.</p>
      <p>If you did not sign up for this account, please contact our support team immediately.</p>
      <p>Regards,<br/><strong>AIsprint Team</strong></p>
    </div>
  </body>
  </html>
  `

  return sendEmail({
    to: user.email,
    subject: `Welcome to AIsprint, ${user.name}!`,
    html,
  })
}

// ─────────────────────────────────────────────
// Send Both Emails (Used in API)
// ─────────────────────────────────────────────

export async function sendLeadEmails(lead: LeadData): Promise<{
  adminSent: boolean
  userSent: boolean
}> {
  const [adminSent, userSent] = await Promise.all([
    sendAdminNotification(lead),
    sendUserConfirmation(lead),
  ])

  return { adminSent, userSent }
}