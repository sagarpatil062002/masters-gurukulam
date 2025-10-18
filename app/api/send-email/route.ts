import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail, sendExamRegistrationEmail, sendResultEmail, sendAdmitCardEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { type, data } = await request.json()

    let result

    switch (type) {
      case 'contact':
        result = await sendContactEmail(data)
        break
      case 'exam-registration':
        result = await sendExamRegistrationEmail(data)
        break
      case 'result':
        result = await sendResultEmail(data)
        break
      case 'admit-card':
        result = await sendAdmitCardEmail(data)
        break
      default:
        return NextResponse.json({ success: false, error: 'Invalid email type' }, { status: 400 })
    }

    if (result.success) {
      return NextResponse.json({ success: true, messageId: result.messageId })
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error('Email API error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}