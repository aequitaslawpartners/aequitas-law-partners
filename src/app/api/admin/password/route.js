import { authenticatedStaff } from '@/lib/admin.mjs'
import { validatePassword } from '@/lib/people-validation.mjs'
import { rows, changeRow } from '@/lib/supabase.mjs'
import { hashPassword } from '../../../../lib/auth'
import { NextResponse } from 'next/server'
import { formatISTDateForLog } from '../../../../lib/dateUtils'
import bcryptjs from 'bcryptjs'

export async function PUT(request) {
  try {
    // Check authentication
    const user = await authenticatedStaff(request)
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

    try { validatePassword(newPassword) }
    catch (error) { return NextResponse.json({ success: false, message: error.message }, { status: 400 }) }

    // Get current user from database
    const currentUser = (await rows('users', `email=eq.${encodeURIComponent(user.email)}&limit=1`))[0]

    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    // Verify current password
    const isCurrentPasswordValid = await bcryptjs.compare(currentPassword, currentUser.password)
    if (!isCurrentPasswordValid) {
      return NextResponse.json(
        { success: false, message: 'Current password is incorrect' },
        { status: 400 }
      )
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword)

    // Update password in database
    const result = await changeRow('users', currentUser._id, 'PATCH', {
      password: hashedNewPassword, updatedAt: new Date().toISOString()
    })

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to update password' },
        { status: 500 }
      )
    }


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
