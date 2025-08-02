import { connectToDatabase } from '../../../lib/mongodb'
import { NextResponse } from 'next/server'
import pako from 'pako'
import { getISTDate, formatISTDateForLog } from '../../../lib/dateUtils'

export async function POST(request) {
  try {
    const body = await request.json()
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      experience, 
      position, 
      specializations, 
      resume, 
      coverLetter 
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !experience || !position || !specializations || !resume) {
      return NextResponse.json(
        { error: 'All required fields must be provided, including resume' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate specializations array
    if (!Array.isArray(specializations) || specializations.length === 0) {
      return NextResponse.json(
        { error: 'At least one specialization must be selected' },
        { status: 400 }
      )
    }

    // Validate resume (base64 format)
    if (!resume || !resume.startsWith('data:application/pdf;base64,')) {
      return NextResponse.json(
        { error: 'Resume is required and must be a valid PDF in base64 format' },
        { status: 400 }
      )
    }

    // Extract base64 data and check size
    const base64Data = resume.split(',')[1]
    const resumeBuffer = Buffer.from(base64Data, 'base64')
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (resumeBuffer.length > maxSize) {
      return NextResponse.json(
        { error: 'Resume file size must not exceed 5MB' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Use maximum compression by compressing the binary data directly
    // This is more efficient than compressing base64 strings
    const compressedBuffer = pako.deflate(resumeBuffer, { 
      level: 9, // Maximum compression level (0-9)
      windowBits: 15,
      memLevel: 9,
      strategy: 0 // Default strategy for best compression
    })
    const compressedBase64 = Buffer.from(compressedBuffer).toString('base64')
    const compressionRatio = ((resumeBuffer.length - compressedBuffer.length) / resumeBuffer.length * 100).toFixed(1)
    
    console.log(`[${formatISTDateForLog(new Date())}] Compression stats:`, {
      originalPDF: `${(resumeBuffer.length / 1024).toFixed(1)} KB`,
      originalBase64: `${(base64Data.length / 1024).toFixed(1)} KB`,
      compressed: `${(compressedBuffer.length / 1024).toFixed(1)} KB`,
      compressedBase64: `${(compressedBase64.length / 1024).toFixed(1)} KB`,
      ratio: `${compressionRatio}% reduction from original PDF`,
      finalSavings: `${(((base64Data.length - compressedBase64.length) / base64Data.length) * 100).toFixed(1)}% storage savings`
    })
    
    
    // Store resume as compressed base64 data
    const recruitmentData = {
      firstName,
      lastName,
      email,
      phone,
      experience,
      position,
      specializations,
      resume: compressedBase64, // Store compressed PDF data as base64
      resumeCompressed: true, // Flag to indicate data is compressed
      compressionVersion: 2, // Version 2 = compressed binary data
      originalSize: resumeBuffer.length, // Store original PDF size
      originalBase64Size: base64Data.length, // Store original base64 size
      coverLetter: coverLetter || '',
      createdAt: getISTDate(),
      status: 'pending'
    }

    // Insert into MongoDB
    const result = await db.collection('recruitment').insertOne(recruitmentData)

    console.log(`[${formatISTDateForLog(new Date())}] Application submitted successfully:`, {
      name: `${firstName} ${lastName}`,
      email,
      applicationId: result.insertedId,
      resumeSize: `${(resumeBuffer.length / 1024).toFixed(1)} KB`,
      submittedAt: formatISTDateForLog(recruitmentData.createdAt)
    })

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        id: result.insertedId
      },
      { status: 201 }
    )

  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Recruitment API error:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    
    // Get applications without resume data for performance
    const applications = await db.collection('recruitment')
      .find({}, { projection: { resume: 0 } })
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ applications })
  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Recruitment GET API error:`, error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
