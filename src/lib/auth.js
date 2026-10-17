import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is required')
  return process.env.JWT_SECRET
}

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(12)
  return bcrypt.hash(password, salt)
}

export const verifyPassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword)
}

export const generateToken = (userId, email) => {
  return jwt.sign(
    { userId, email },
    getJwtSecret(),
    { expiresIn: '24h' }
  )
}

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] })
  } catch (error) {
    return null
  }
}

export const getTokenFromRequest = (request) => {
  const authHeader = request.headers.get('authorization')
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}
