'use client'

import { useEffect, useRef, useState } from 'react'
import { practiceAreasData } from '@/data/practiceAreas'
import { MAX_FILE_BYTES } from '@/lib/uploadLimits.mjs'
import styles from './admin.module.css'

const paths = {
  overview: 'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  contacts: 'M4 5h16v14H4z M4 6l8 6 8-6',
  applications: 'M8 7V4h8v3 M3 7h18v14H3z M3 12c5 4 13 4 18 0 M10 13h4',
  people: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M17 4a4 4 0 0 1 0 7 M22 21v-2a4 4 0 0 0-3-3.87',
  users: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M5 21v-2a7 7 0 0 1 14 0v2',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6 M9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1z',
  arrow: 'M5 12h14 M13 6l6 6-6 6',
  external: 'M14 3h7v7 M10 14L21 3 M21 14v7H3V3h7',
  plus: 'M12 5v14 M5 12h14',
  search: 'M21 21l-5-5 M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14',
  edit: 'M15 5l4 4 M4 20l5-1L21 7a3 3 0 0 0-4-4L5 15z',
  trash: 'M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7',
  close: 'M6 6l12 12 M18 6L6 18',
  menu: 'M4 6h16 M4 12h16 M4 18h16',
  logout: 'M9 4H4v16h5 M13 7l5 5-5 5 M8 12h13',
  clock: 'M12 8v5l3 2 M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0',
  check: 'M5 12l4 4L19 6',
  lock: 'M7 10V7a5 5 0 0 1 10 0v3 M4 10h16v11H4z M12 14v3',
  eye: 'M2 12s3-7 10-7 10 7 10 7-3 7-10 7S2 12 2 12 M15 12a3 3 0 1 0-6 0 3 3 0 0 0 6 0',
  download: 'M12 3v12 M7 10l5 5 5-5 M4 16v5h16v-5',
  refresh: 'M20 7V3l-4 1 M20 7a9 9 0 1 0 1 8',
}

export function Icon({ name, size = 18, className }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.people} /></svg>
}

export function Spinner() {
  return <span className={`${styles.spinner} ${styles.inlineSpinner}`} aria-hidden="true" />
}

export function Photo({ src, alt = 'Profile photo', className = '' }) {
  const dialog = useRef(null)
  const open = () => dialog.current?.showModal()
  return <><img src={src} alt={alt} className={`${className} ${styles.clickablePhoto}`} role="button" tabIndex={0} aria-label={`View ${alt}`} onClick={open} onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open() } }} /><dialog ref={dialog} className={styles.imageDialog} aria-label={alt} onClick={event => { if (event.target === event.currentTarget) dialog.current.close() }}><button type="button" className={styles.imageClose} aria-label="Close image preview" onClick={() => dialog.current.close()}><Icon name="close" /></button><img className={styles.previewImage} src={src} alt={alt} /><p>{alt}</p></dialog></>
}

export function Avatar({ name = '', image }) {
  return image ? <Photo className={styles.avatar} src={image} alt={`${name || 'User'} photo`} /> : <span className={styles.avatar}>{name.split(/[ @.]+/).filter(Boolean).slice(0, 2).map(word => word[0]).join('').toUpperCase() || 'AL'}</span>
}

export function Badge({ children, tone }) {
  return <span className={styles.badge} data-tone={tone}>{children === 'alp' ? 'ALP' : children === 'super_admin' ? 'Super admin' : children}</span>
}

export function Field({ label, required, hint, children, full = false }) {
  return <label className={`${styles.field} ${full ? styles.full : ''}`}><span>{label}{required && <em aria-hidden="true">*</em>}</span>{children}{hint && <small>{hint}</small>}</label>
}

export function Drawer({ title, description, onClose, children, busy = false }) {
  const ref = useRef(null)
  useEffect(() => {
    const previous = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector('input:not([type=file]),textarea,button')?.focus()
    const keyboard = event => {
      if (document.querySelector('dialog[open]')) return
      if (event.key === 'Escape' && !busy) onClose()
      if (event.key === 'Tab') {
        const items = [...ref.current.querySelectorAll('button:not(:disabled),input:not(:disabled),textarea:not(:disabled),select:not(:disabled),a[href]')]
        if (!items.length) return
        if (event.shiftKey && document.activeElement === items[0]) { event.preventDefault(); items.at(-1).focus() }
        else if (!event.shiftKey && document.activeElement === items.at(-1)) { event.preventDefault(); items[0].focus() }
      }
    }
    document.addEventListener('keydown', keyboard)
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', keyboard); previous?.focus() }
  }, [busy, onClose])
  return <div className={styles.overlay} onMouseDown={event => { if (event.target === event.currentTarget && !busy) onClose() }}><section className={styles.drawer} role="dialog" aria-modal="true" aria-labelledby="drawer-title" ref={ref}><header className={styles.drawerHeader}><div><p className={styles.eyebrow}>Aequitas Law Partners</p><h2 id="drawer-title">{title}</h2><p>{description}</p></div><button type="button" className={styles.iconButton} onClick={onClose} disabled={busy} aria-label="Close dialog"><Icon name="close" /></button></header>{children}</section></div>
}

const plainBio = text => (text || '').replace(/<br\s*\/?>/gi, '\n').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&')

export function RecordEditor({ kind, record, actor, api, onClose, onSaved, self = false }) {
  const person = record?.role !== 'super_admin'
  const passwordRequired = !record || (self && actor?.role === 'alp')
  const label = kind === 'people' ? 'person' : 'user'
  const initial = person ? { ...record?.profile, role: record?.role } : record
  const [form, setForm] = useState({ name: initial?.name || '', email: initial?.email || '', role: initial?.role || 'alp', password: '', designation: initial?.designation || '', experience: initial?.experience || '', bio: plainBio(initial?.bio), expertise: initial?.expertise || [], education: (initial?.education || []).join('\n'), languages: (initial?.languages || []).join(', '), linkedin: initial?.linkedin || '', memberships: (initial?.memberships || []).join('\n'), personalNote: initial?.personalNote || '' })
  const [expertiseDraft, setExpertiseDraft] = useState('')
  const [customExpertise, setCustomExpertise] = useState([])
  const expertiseOptions = [...new Set([...practiceAreasData.map(area => area.title), ...(initial?.expertise || []), ...customExpertise, ...form.expertise])]
  const addExpertise = () => {
    const value = expertiseDraft.trim()
    if (!value) return
    const option = expertiseOptions.find(item => item.toLowerCase() === value.toLowerCase()) || value
    setCustomExpertise(current => current.includes(option) ? current : [...current, option])
    setForm(current => ({ ...current, expertise: current.expertise.includes(option) ? current.expertise : [...current.expertise, option] }))
    setExpertiseDraft('')
  }
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(initial?.image || '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const change = event => setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  useEffect(() => {
    if (!file) { setPreview(initial?.image || ''); return }
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file, initial?.image])
  const submit = async event => {
    event.preventDefault()
    setError('')
    if (person && !form.expertise.length) { setError('Select at least one area of expertise.'); return }
    if (busy) return
    setBusy(true)
    try {
      let body
      if (person) {
        const profile = { ...form, education: form.education.split('\n').map(item => item.trim()).filter(Boolean), languages: form.languages.split(',').map(item => item.trim()).filter(Boolean), memberships: form.memberships.split('\n').map(item => item.trim()).filter(Boolean) }
        body = new FormData()
        body.append('profile', JSON.stringify(profile))
        body.append('password', form.password)
        if (record?._id) body.append('id', record._id)
        if (file) body.append('image', file)
      } else body = { ...form, id: record?._id }
      const result = await api(self ? '/api/admin/profile' : `/api/admin/${kind}`, { method: self || record ? 'PUT' : 'POST', body })
      await onSaved(result.message || `${person ? 'Person' : 'User'} ${record ? 'updated' : 'created'} successfully.`)
    } catch (error) { setError(error.message) }
    finally { setBusy(false) }
  }
  const textField = (name, label, options = {}) => <Field label={label} required={options.required !== false} full={options.full} hint={options.hint}><input className={styles.input} name={name} value={form[name]} onChange={change} required={options.required !== false} type={options.type || 'text'} maxLength={options.maxLength || 300} autoComplete={options.autoComplete || 'off'} placeholder={options.placeholder} /></Field>
  return <Drawer title={self ? 'Edit my complete profile' : `${record ? 'Edit' : 'Add'} ${label}`} description={self ? 'Update your personal details, login and public professional profile.' : person ? 'Manage the public profile and its ALP login.' : 'Manage access to the firm workspace.'} onClose={onClose} busy={busy}><form className={styles.drawerForm} onSubmit={submit} aria-busy={busy}><div className={styles.drawerBody}><fieldset className={styles.formFields} disabled={busy}>{error && <div className={styles.toast} data-error="true" role="alert">{error}</div>}
    {person && <><h3 className={styles.sectionTitle}><span>01</span>Profile photograph</h3><div className={styles.photoInput}>{preview ? <Photo src={preview} alt="Profile preview" /> : <Icon name="users" size={40} />}<div><strong>Photograph <em>*</em></strong><small>JPEG, PNG or WebP. Maximum 200 KB.</small><input aria-label="Profile photograph" type="file" accept="image/jpeg,image/png,image/webp" required={!record?.profile?.image} onChange={event => { const chosen = event.target.files[0]; if (chosen && (chosen.size > MAX_FILE_BYTES || !['image/jpeg', 'image/png', 'image/webp'].includes(chosen.type))) { setError('Choose a JPEG, PNG or WebP photo of 200 KB or less.'); event.target.value = ''; setFile(null); return } setFile(chosen || null); setError('') }} /></div></div></>}
    <h3 className={styles.sectionTitle}><span>{person ? '02' : '01'}</span>{person ? 'Personal details' : 'Account details'}</h3><div className={styles.formGrid}>{textField('name', 'Full name', { placeholder: 'Full name' })}{textField('email', person ? 'Email address' : 'Login email', { type: 'email', autoComplete: 'off', placeholder: 'name@alplaw.in' })}{person && <>{textField('designation', 'Designation', { placeholder: 'e.g. Principal Associate' })}{textField('experience', 'Experience', { placeholder: 'e.g. 8+ years' })}</>}{!self && <Field label="Workspace role" required hint="Administrators manage people and users. ALP members manage submissions."><select className={styles.input} name="role" value={form.role} onChange={change} disabled={record?._id === actor?._id || record?.role === 'super_admin'}>{record?.role === 'super_admin' ? <option value="super_admin">Super admin</option> : <><option value="alp">ALP</option><option value="admin">Administrator</option></>}</select></Field>}
    <Field label={record ? 'Set login password' : 'Password'} required={passwordRequired} hint={passwordRequired ? 'Required. At least 8 characters.' : 'Leave blank to keep the current password.'}><input className={styles.input} name="password" type="password" autoComplete="new-password" required={passwordRequired} minLength={8} maxLength={72} value={form.password} onChange={change} placeholder={record ? (passwordRequired ? 'Set the login password' : 'Leave blank to keep current password') : 'Set an initial password'} /></Field></div>
    {person && <><h3 className={styles.sectionTitle}><span>03</span>Professional profile</h3><Field label="Biography" required hint="Use plain text. Line breaks are preserved on the public profile."><textarea className={styles.textarea} rows={6} required name="bio" value={form.bio} onChange={change} maxLength={20000} placeholder="Tell the story of their practice, experience and approach." /></Field><div className={styles.field}><span>Areas of expertise <em>*</em></span><div className={styles.expertiseOptions}>{expertiseOptions.map(title => <label key={title}><input type="checkbox" checked={form.expertise.includes(title)} onChange={() => setForm(current => ({ ...current, expertise: current.expertise.includes(title) ? current.expertise.filter(item => item !== title) : [...current.expertise, title] }))} />{title}</label>)}</div><div className={styles.customExpertise}><input className={styles.input} aria-label="Additional area of expertise" placeholder="Enter another area of expertise" maxLength={500} value={expertiseDraft} onChange={event => setExpertiseDraft(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); addExpertise() } }} /><button type="button" className={styles.secondary} onClick={addExpertise} disabled={!expertiseDraft.trim()}><Icon name="plus" size={14} />Add area</button></div><small>Add as many areas as needed. Use Add area or press Enter.</small></div><div className={styles.formGrid}><Field label="Education" required hint="One qualification per line."><textarea className={styles.textarea} required name="education" value={form.education} onChange={change} placeholder="Degree, institution" /></Field><Field label="Languages" required hint="Separate languages with commas."><input className={styles.input} required name="languages" value={form.languages} onChange={change} placeholder="English, Hindi, Marathi" /></Field></div><h3 className={styles.sectionTitle}><span>04</span>Additional information</h3>{textField('linkedin', 'LinkedIn profile', { required: false, placeholder: 'https://www.linkedin.com/in/…' })}<Field label="Memberships" hint="One membership per line."><textarea className={styles.textarea} name="memberships" value={form.memberships} onChange={change} /></Field><Field label="When not lawyering?" hint="An optional personal note for the public profile."><textarea className={styles.textarea} rows={4} name="personalNote" value={form.personalNote} onChange={change} maxLength={5000} /></Field></>}
    </fieldset></div><footer className={styles.drawerFooter}><small><span style={{ color: '#b66b6b' }}>*</span> Required fields</small><div><button className={styles.secondary} type="button" onClick={onClose} disabled={busy}>Cancel</button><button className={styles.button} disabled={busy} type="submit">{busy ? 'Saving…' : record ? 'Save changes' : `Create ${label}`}{busy ? <Spinner /> : <Icon name="check" size={16} />}</button></div></footer></form></Drawer>
}
