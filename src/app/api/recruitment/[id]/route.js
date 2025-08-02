import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request, { params }) {
  try {
    const { id } = params

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: 'Invalid application ID' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db('aequitas_law')
    const collection = db.collection('recruitment')

    const application = await collection.findOne({ _id: new ObjectId(id) })

    if (!application) {
      return Response.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }

    return Response.json({ application })
  } catch (error) {
    console.error('Recruitment GET by ID API error:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
