import { authenticatedStaff } from '@/lib/admin.mjs'
import { rows, insertRow } from '@/lib/supabase.mjs'
import { getISTDate, formatISTDateForLog } from '../../../lib/dateUtils'

export async function POST(request) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, subject, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !subject || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return Response.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Create contact document
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString(),
      status: 'new'
    }

    // Save the contact
    const result = await insertRow('contacts', contactData)

    return Response.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: result._id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Contact API error:`, error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request) {
  if (!(await authenticatedStaff(request))) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    return Response.json({ contacts: await rows('contacts', 'order=createdAt.desc&limit=1000') })
  } catch {
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
