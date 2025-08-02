import { connectToDatabase } from './mongodb'
import { GridFSBucket } from 'mongodb'

let gridFSBucket = null

export async function getGridFSBucket() {
  if (!gridFSBucket) {
    const { db } = await connectToDatabase()
    gridFSBucket = new GridFSBucket(db, { bucketName: 'resumes' })
  }
  return gridFSBucket
}

export async function uploadFileToGridFS(buffer, filename, metadata = {}) {
  const bucket = await getGridFSBucket()
  
  return new Promise((resolve, reject) => {
    const uploadStream = bucket.openUploadStream(filename, {
      metadata: {
        ...metadata,
        uploadDate: new Date()
      }
    })

    uploadStream.on('error', reject)
    uploadStream.on('finish', () => {
      resolve(uploadStream.id)
    })

    uploadStream.end(buffer)
  })
}

export async function downloadFileFromGridFS(fileId) {
  const bucket = await getGridFSBucket()
  
  return new Promise((resolve, reject) => {
    const chunks = []
    const downloadStream = bucket.openDownloadStream(fileId)

    downloadStream.on('data', (chunk) => {
      chunks.push(chunk)
    })

    downloadStream.on('error', reject)
    downloadStream.on('end', () => {
      resolve(Buffer.concat(chunks))
    })
  })
}

export async function getFileInfoFromGridFS(fileId) {
  const bucket = await getGridFSBucket()
  
  try {
    const files = await bucket.find({ _id: fileId }).toArray()
    return files[0] || null
  } catch (error) {
    return null
  }
}

export async function deleteFileFromGridFS(fileId) {
  const bucket = await getGridFSBucket()
  return bucket.delete(fileId)
}
