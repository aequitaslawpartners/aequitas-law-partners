export const PERSON_TEXT_FIELDS = ['name', 'designation', 'email', 'bio', 'experience']
export const PERSON_LIST_FIELDS = ['expertise', 'education', 'languages']

export function validatePassword(password, { required = true } = {}) {
  if (!required && (password === undefined || password === null || password === '')) return undefined
  if (typeof password !== 'string' || !password.trim() || password.length < 8 || Buffer.byteLength(password, 'utf8') > 72) throw new Error('Password must contain at least 8 characters and no more than 72 bytes')
  return password
}

const escape = text => text.replace(/[&<>"']/g, value => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[value])

export function validatePerson(input) {
  const profile = {}
  for (const key of PERSON_TEXT_FIELDS) {
    if (typeof input[key] !== 'string' || !input[key].trim()) throw new Error(`${key} is required`)
    if (input[key].length > (key === 'bio' ? 20000 : 300)) throw new Error(`${key} is too long`)
    profile[key] = input[key].trim()
  }
  profile.email = profile.email.toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) throw new Error('Enter a valid email address')
  for (const key of PERSON_LIST_FIELDS) {
    if (!Array.isArray(input[key]) || !input[key].length || (key !== 'expertise' && input[key].length > 40) || input[key].some(value => typeof value !== 'string' || !value.trim() || value.length > 500)) throw new Error(`${key} must contain at least one entry`)
    profile[key] = input[key].map(value => value.trim())
  }
  profile.bio = escape(profile.bio).replace(/\r?\n/g, '<br>')
  for (const key of ['personalNote', 'linkedin']) {
    if (input[key] !== undefined && (typeof input[key] !== 'string' || input[key].length > 5000)) throw new Error(`Invalid ${key}`)
    profile[key] = (input[key] || '').trim()
  }
  profile.linkedin = profile.linkedin.replace(/^https?:\/\//, '')
  if (profile.linkedin && !/^(?:www\.)?(?:[a-z]{2}\.)?linkedin\.com\/[a-zA-Z0-9_/?=&%.#-]+$/.test(profile.linkedin)) throw new Error('Enter a valid LinkedIn profile URL')
  const memberships = input.memberships || []
  if (!Array.isArray(memberships) || memberships.some(item => typeof item !== 'string' || item.length > 500)) throw new Error('Invalid memberships')
  profile.memberships = memberships.filter(item => item.trim()).map(item => item.trim())
  return profile
}
