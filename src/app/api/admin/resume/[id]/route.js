import { connectToDatabase } from '../../../../../lib/mongodb'
import { getTokenFromRequest, verifyToken } from '../../../../../lib/auth'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import pako from 'pako'
import { formatISTDateForLog } from '../../../../../lib/dateUtils'

export async function GET(request, { params }) {
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

    const { id } = await params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Get the recruitment application with resume
    const application = await db.collection('recruitment').findOne(
      { _id: new ObjectId(id) },
      { projection: { 
        resume: 1, 
        resumeCompressed: 1, 
        compressionVersion: 1,
        originalSize: 1, 
        originalBase64Size: 1,
        firstName: 1, 
        lastName: 1, 
        email: 1 
      } }
    )
    
    if (!application) {
      return NextResponse.json(
        { success: false, message: 'Application not found' },
        { status: 404 }
      )
    }

    if (!application.resume) {
      return NextResponse.json(
        { success: false, message: 'No resume found for this application' },
        { status: 404 }
      )
    }

    // Decompress the resume data if it's compressed
    let resumeData = application.resume
    if (application.resumeCompressed === true) {
      try {
        const compressedBuffer = Buffer.from(application.resume, 'base64')
        
        if (application.compressionVersion === 2) {
          // New compression method: decompress binary PDF data
          const decompressedBuffer = pako.inflate(compressedBuffer)
          resumeData = Buffer.from(decompressedBuffer).toString('base64')
          console.log(`[${formatISTDateForLog(new Date())}] Decompressed resume (v2):`, {
            user: `${application.firstName} ${application.lastName}`,
            compressed: `${(application.resume.length / 1024).toFixed(1)} KB`,
            decompressed: `${(resumeData.length / 1024).toFixed(1)} KB`,
            originalPDFSize: `${(application.originalSize / 1024).toFixed(1)} KB`
          })
        } else {
          // Legacy compression method: decompress base64 string
          const decompressedBuffer = pako.inflate(compressedBuffer)
          resumeData = Buffer.from(decompressedBuffer).toString()
          console.log(`[${formatISTDateForLog(new Date())}] Decompressed resume (v1):`, {
            user: `${application.firstName} ${application.lastName}`,
            compressed: `${(application.resume.length / 1024).toFixed(1)} KB`,
            decompressed: `${(resumeData.length / 1024).toFixed(1)} KB`
          })
        }
      } catch (error) {
        console.error(`[${formatISTDateForLog(new Date())}] Decompression error:`, error)
        return NextResponse.json(
          { success: false, message: 'Failed to decompress resume data' },
          { status: 500 }
        )
      }
    } else {
      // Handle legacy uncompressed data
      console.log(`[${formatISTDateForLog(new Date())}] Using uncompressed resume data (legacy) for:`, `${application.firstName} ${application.lastName}`)
    }

    const fileName = `${application.firstName}_${application.lastName}_resume.pdf`
    const fileSize = application.originalSize || application.originalBase64Size || Math.floor((resumeData.length * 3) / 4)

    return NextResponse.json({
      success: true,
      data: {
        type: 'pdf',
        resume: resumeData,
        fileName: fileName,
        contentType: 'application/pdf',
        size: fileSize,
        name: `${application.firstName} ${application.lastName}`,
        email: application.email
      }
    })
  } catch (error) {
    console.error(`[${formatISTDateForLog(new Date())}] Failed to fetch resume:`, error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch resume' },
      { status: 500 }
    )
  }
}
