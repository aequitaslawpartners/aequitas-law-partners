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

    const { id } = params

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'ID is required' },
        { status: 400 }
      )
    }

    const { db } = await connectToDatabase()
    
    // Get the recruitment application with resume file ID
    const application = await db.collection('recruitment').findOne(
      { _id: new ObjectId(id) },
      { projection: { resumeFileId: 1, firstName: 1, lastName: 1 } }
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


    let fileBuffer
    
    try {
      if (application.resumeCompressed && application.compressionVersion === 2) {
        // Version 2: Decompress the compressed binary data
        const compressedBuffer = Buffer.from(application.resume, 'base64')
        fileBuffer = Buffer.from(pako.inflate(compressedBuffer))
        

      } else if (application.resumeCompressed && application.compressionVersion === 1) {
        // Version 1: Legacy compressed base64 string
        const decompressedBase64 = pako.inflate(Buffer.from(application.resume, 'base64'), { to: 'string' })
        fileBuffer = Buffer.from(decompressedBase64, 'base64')
      } else {
        // Uncompressed base64 data
        fileBuffer = Buffer.from(application.resume, 'base64')
      }
    } catch (decompressError) {
      console.error(`[${formatISTDateForLog(new Date())}] Error processing resume data:`, decompressError)
      return NextResponse.json(
        { success: false, message: 'Error processing resume file' },
        { status: 500 }
      )
    }
    
    // Return file as direct download
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${application.firstName}_${application.lastName}_resume.pdf"`,
        'Content-Length': fileBuffer.length.toString(),
      }
    })
  } catch (error) {
    console.error('Failed to download resume:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to download resume' },
      { status: 500 }
    )
  }
}
