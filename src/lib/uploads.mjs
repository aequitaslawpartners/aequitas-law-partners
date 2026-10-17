import { MAX_FILE_BYTES } from './uploadLimits.mjs'
export { MAX_FILE_BYTES } from './uploadLimits.mjs'

export function decodeResume(resume) {
  const match = typeof resume === 'string' && /^data:application\/pdf;base64,([A-Za-z0-9+/]+={0,2})$/.exec(resume)
  if (!match) throw new Error('Resume must be a PDF file')
  if (match[1].length > Math.ceil(MAX_FILE_BYTES / 3) * 4) throw new Error('Resume must not exceed 500 KB')
  const buffer = Buffer.from(match[1], 'base64')
  if (buffer.length > MAX_FILE_BYTES) throw new Error('Resume must not exceed 500 KB')
  if (buffer.toString('base64') !== match[1] || buffer.subarray(0, 5).toString() !== '%PDF-') throw new Error('Resume must be a valid PDF file')
  return buffer
}
