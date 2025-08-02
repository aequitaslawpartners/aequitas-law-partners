import { connectToDatabase } from '../../../../../lib/mongodb'
import { downloadFileFromGridFS, getFileInfoFromGridFS } from '../../../../../lib/gridfs'
import { getTokenFromRequest, verifyToken } from '../../../../../lib/auth'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

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

    if (!application.resumeFileId) {
      return NextResponse.json(
        { success: false, message: 'No resume found for this application' },
        { status: 404 }
      )
    }

    // Get file info from GridFS
    const fileInfo = await getFileInfoFromGridFS(application.resumeFileId)
    if (!fileInfo) {
      return NextResponse.json(
        { success: false, message: 'Resume file not found in storage' },
        { status: 404 }
      )
    }

    // Download file buffer from GridFS
    const fileBuffer = await downloadFileFromGridFS(application.resumeFileId)
    
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
