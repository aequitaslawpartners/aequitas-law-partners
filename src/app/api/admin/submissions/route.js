import { connectToDatabase } from '../../../../lib/mongodb'
import { getTokenFromRequest, verifyToken } from '../../../../lib/auth'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { formatISTDateForLog } from '../../../../lib/dateUtils'

// Middleware to check authentication
const authenticateRequest = (request) => {
  const token = getTokenFromRequest(request)
  if (!token) {
    return null
  }
  return verifyToken(token)
}

export async function GET(request) {
  try {
    // Check authentication
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Ensure indexes exist for better performance
    await db.collection('contacts').createIndex({ createdAt: -1 })
    await db.collection('recruitment').createIndex({ createdAt: -1 })
    
    // Get contacts - limit to last 1000 entries
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray()
    
    // Get recruitment applications - limit to last 1000 entries
    const applications = await db.collection('recruitment')
      .find({})
      .sort({ createdAt: -1 })
      .limit(1000)
      .toArray()
    
    return NextResponse.json({
      success: true,
      data: {
        contacts,
        applications
      }
    })
  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Failed to fetch submissions:`, error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}

export async function DELETE(request) {
  try {
    // Check authentication
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    const type = searchParams.get('type') // 'contact' or 'recruitment'

    if (!id || !type) {
      return NextResponse.json(
        { success: false, message: 'ID and type are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = type === 'contact' ? 'contacts' : 'recruitment'
    
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Record not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Record deleted successfully'
    })
  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Failed to delete submission:`, error)
    return NextResponse.json(
      { success: false, message: 'Failed to delete submission' },
      { status: 500 }
    )
  }
}

export async function PUT(request) {
  try {
    // Check authentication
    const user = authenticateRequest(request)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id, type, status } = await request.json()

    if (!id || !type || !status) {
      return NextResponse.json(
        { success: false, message: 'ID, type, and status are required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    const collection = type === 'contact' ? 'contacts' : 'recruitment'
    
    const result = await db.collection(collection).updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status,
          updatedAt: new Date(),
          updatedBy: user.email
        }
      }
    )
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Record not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully'
    })
  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Failed to update submission:`, error)
    return NextResponse.json(
      { success: false, message: 'Failed to update submission' },
      { status: 500 }
    )
  }
}
