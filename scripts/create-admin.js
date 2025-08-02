import { MongoClient } from 'mongodb'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config({ path: join(__dirname, '..', '.env.local') })

async function createAdminUser() {
  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    const db = client.db('aequitas_law')
    
    // Check if any admin users already exist
    const existingUser = await db.collection('users').findOne({})
    if (existingUser) {
      console.log('Admin user already exists')
      return
    }

    // Create first admin user
    const email = 'admin@aequitaslaw.com'
    const password = 'admin123' // Change this to a secure password
    
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    const result = await db.collection('users').insertOne({
      email,
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    })

    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('User ID:', result.insertedId)
    console.log('\nPlease change the password after first login.')
    
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await client.close()
  }
}

createAdminUser()
