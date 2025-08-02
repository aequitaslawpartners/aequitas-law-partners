import { connectToDatabase } from '../../../../lib/mongodb'
import { getTokenFromRequest, verifyToken, hashPassword } from '../../../../lib/auth'
import { NextResponse } from 'next/server'
import { formatISTDateForLog } from '../../../../lib/dateUtils'
import bcryptjs from 'bcryptjs'

export async function PUT(request) {
  try {
    // Check authentication
    const token = getTokenFromRequest(request)
    const user = verifyToken(token)
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { currentPassword, newPassword, confirmPassword } = body

    // Validate required fields
    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      )
    }

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, message: 'New passwords do not match' },
        { status: 400 }
      )
    }

    // Check password strength
    if (newPassword.length < 6) {
      return NextResponse.json(
        { success: false, message: 'New password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()

    // Get current user from database
    const currentUser = await db.collection('users').findOne({
      email: user.email
    })

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, currentUser.password)
    if (!isCurrentPasswordValid) {
      console.log(`[${formatISTDateForLog(new Date())}] Invalid current password attempt by:`, user.email)
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password in database
    const result = await db.collection('users').updateOne(
      { email: user.email },
      { 
        $set: { 
          password: hashedNewPassword,
          updatedAt: new Date()
        }
      }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to update password' },
        { status: 500 }
      )
    }

    console.log(`[${formatISTDateForLog(new Date())}] Password updated successfully for:`, user.email)

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully'
    })

  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Password update error:`, error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
