import sharp from 'sharp'
import { MAX_FILE_BYTES } from './uploadLimits.mjs'

export async function readProfileImage(file) {
  const formats = { 'image/jpeg': 'jpeg', 'image/png': 'png', 'image/webp': 'webp' }
  if (!(file instanceof File) || !Object.hasOwn(formats, file.type) || !file.size || file.size > MAX_FILE_BYTES) throw new Error('A JPEG, PNG or WebP photo of 200 KB or less is required')
  const buffer = Buffer.from(await file.arrayBuffer())
  try {
    const metadata = await sharp(buffer, { limitInputPixels: 25000000 }).metadata()
    if (metadata.format !== formats[file.type]) throw new Error()
  } catch { throw new Error('The photo must be a valid JPEG, PNG or WebP image') }
  return { buffer, extension: formats[file.type], type: file.type }
}
