import clientPromise from '@/lib/mongodb'
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

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db('aequitas_law')
    const collection = db.collection('contacts')

    // Create contact document
    const contactData = {
      firstName,
      lastName,
      email,
      phone,
      subject,
      message,
      createdAt: getISTDate(),
      status: 'new'
    }

    // Insert into MongoDB
    const result = await collection.insertOne(contactData)

    return Response.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: result.insertedId
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

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('aequitas_law')
    const collection = db.collection('contacts')

    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return Response.json({ contacts })
  } catch (error) {
    console.error('Contact GET API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
