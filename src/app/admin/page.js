'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { formatISTDateShort } from '@/lib/dateUtils'
import { MAX_FILE_BYTES } from '@/lib/uploadLimits.mjs'
import { Avatar, Badge, Drawer, Field, Icon, Photo, RecordEditor } from './ui'
import styles from './admin.module.css'

const NAV = [{ id: 'overview', title: 'Overview' }, { id: 'contacts', title: 'Contact inquiries' }, { id: 'applications', title: 'Applications' }, { id: 'people', title: 'People' }, { id: 'users', title: 'Users & access' }, { id: 'settings', title: 'My settings' }]
const STATUS = ['pending', 'reviewed', 'contacted', 'rejected']
const pageSize = 20
const date = value => value ? formatISTDateShort(value) : '—'

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [ownPerson, setOwnPerson] = useState(null)
  const [data, setData] = useState({ contacts: [], applications: [], people: [], users: [] })
  const [tab, setTab] = useState('overview')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState(null)
  const [editor, setEditor] = useState(null)
  const [detail, setDetail] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [password, setPassword] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const isAdmin = ['super_admin', 'admin'].includes(user?.role)

  const logout = useCallback(() => { Cookies.remove('admin_token'); Cookies.remove('admin_user'); router.replace('/admin/login') }, [router])
  const api = useCallback(async (url, options = {}) => {
    const token = Cookies.get('admin_token')
    if (!token) { logout(); throw new Error('Please sign in to continue.') }
    const multipart = options.body instanceof FormData
    const response = await fetch(url, { ...options, headers: { Authorization: `Bearer ${token}`, ...(!multipart && options.body ? { 'Content-Type': 'application/json' } : {}) }, body: options.body === undefined ? undefined : multipart ? options.body : JSON.stringify(options.body) })
    if (response.status === 401) { logout(); throw new Error('Your session has expired. Please sign in again.') }
    const result = await response.json()
    if (!response.ok || (result.success === false && response.status !== 207)) throw new Error(result.message || result.error || 'The request could not be completed.')
    return result
  }, [logout])

  const reload = useCallback(async () => {
    const [profile, submissions] = await Promise.all([api('/api/admin/profile'), api('/api/admin/submissions')])
    setUser(profile.user)
    setOwnPerson(profile.person)
    const adminData = ['super_admin', 'admin'].includes(profile.user.role) ? await Promise.all([api('/api/admin/people'), api('/api/admin/users')]) : []
    setData({ ...submissions.data, people: adminData[0]?.people || [], users: adminData[1]?.users || [] })
  }, [api])

  useEffect(() => { reload().catch(error => setNotice({ error: true, text: error.message })).finally(() => setLoading(false)) }, [reload])
  useEffect(() => { setSearch(''); setFilter('all'); setSelected([]); setPage(1); setMenuOpen(false) }, [tab])
  useEffect(() => { setPage(1); setSelected([]) }, [search, filter])
  const closeEditor = useCallback(() => setEditor(null), [])
  const closeDetail = useCallback(() => setDetail(null), [])
  const afterSave = async message => { await reload(); setEditor(null); setNotice({ text: message }) }
  const refresh = async () => { setRefreshing(true); try { await reload() } catch (error) { setNotice({ error: true, text: error.message }) } finally { setRefreshing(false) } }

  const records = useMemo(() => (data[tab] || []).filter(row => {
    const value = tab === 'people' ? row.profile : row
    const haystack = [value.name, value.firstName, value.lastName, value.email, value.designation, value.subject, value.position, ...(value.expertise || [])].filter(Boolean).join(' ').toLowerCase()
    return haystack.includes(search.toLowerCase()) && (filter === 'all' || (tab === 'users' ? row.role : row.status || 'pending') === filter)
  }), [data, tab, search, filter])
  const totalPages = Math.max(1, Math.ceil(records.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const shown = records.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const protectedRecord = row => ['users', 'people'].includes(tab) && (row._id === user?._id || row.role === 'super_admin')
  const selectable = shown.filter(row => !protectedRecord(row))
  const toggle = id => setSelected(current => current.includes(id) ? current.filter(value => value !== id) : [...current, id])
  const allSelected = selectable.length > 0 && selectable.every(row => selected.includes(row._id))
  const reviewCount = [...data.contacts, ...data.applications].filter(row => ['new', 'pending'].includes(row.status)).length
  const activity = [...data.contacts.map(row => ({ ...row, kind: 'contacts' })), ...data.applications.map(row => ({ ...row, kind: 'applications' }))].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)

  const deleteItems = async ids => {
    const noun = tab === 'people' ? 'public profile(s) and any linked login accounts' : tab === 'users' ? 'user account(s) and any linked public profiles' : 'submission(s)'
    if (!ids.length || busy || !confirm(`Delete ${ids.length} ${noun} and their stored files? This cannot be undone.`)) return
    setBusy(true)
    try {
      const failed = []
      for (let offset = 0; offset < ids.length; offset += 50) {
        const result = await api(tab === 'users' || tab === 'people' ? `/api/admin/${tab}` : '/api/admin/submissions', { method: 'DELETE', body: { ids: ids.slice(offset, offset + 50), type: tab === 'contacts' ? 'contact' : 'recruitment' } })
        setSelected(current => current.filter(id => !(result.deletedIds || []).includes(id)))
        failed.push(...(result.failed || []))
      }
      await reload()
      setNotice(failed.length ? { error: true, text: `${failed.length} record(s) could not be deleted. ${failed[0].message}` } : { text: `${ids.length} record(s) and their stored files deleted.` })
    } catch (error) { setNotice({ error: true, text: error.message }) }
    finally { setBusy(false) }
  }

  const updateStatus = async (row, status) => {
    try {
      await api('/api/admin/submissions', { method: 'PUT', body: { id: row._id, type: tab === 'contacts' ? 'contact' : 'recruitment', status } })
      setData(current => ({ ...current, [tab]: current[tab].map(item => item._id === row._id ? { ...item, status } : item) }))
    } catch (error) { setNotice({ error: true, text: error.message }) }
  }

  const download = async row => {
    try {
      const result = await api(`/api/admin/resume/${row._id}`)
      const bytes = Uint8Array.from(atob(result.data.resume), character => character.charCodeAt(0))
      const url = URL.createObjectURL(new Blob([bytes], { type: 'application/pdf' }))
      const link = document.createElement('a'); link.href = url; link.download = result.data.fileName; link.click()
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch (error) { setNotice({ error: true, text: error.message }) }
  }

  const uploadPhoto = async event => {
    const file = event.target.files[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_FILE_BYTES || !['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setNotice({ error: true, text: 'Choose a JPEG, PNG or WebP photo of 200 KB or less.' }); return }
    setBusy(true)
    try { const body = new FormData(); body.append('image', file); const result = await api('/api/admin/profile', { method: 'POST', body }); await reload(); setNotice({ text: result.message || 'Profile photograph updated.' }) }
    catch (error) { setNotice({ error: true, text: error.message }) }
    finally { setBusy(false) }
  }

  const changePassword = async event => {
    event.preventDefault()
    if (password.newPassword !== password.confirmPassword) { setNotice({ error: true, text: 'The new passwords do not match.' }); return }
    setBusy(true)
    try { await api('/api/admin/password', { method: 'PUT', body: password }); setPassword({ currentPassword: '', newPassword: '', confirmPassword: '' }); setNotice({ text: 'Your password has been updated.' }) }
    catch (error) { setNotice({ error: true, text: error.message }) }
    finally { setBusy(false) }
  }

  if (loading) return <div className={styles.loading}><span className={styles.spinner} /><span>Opening your workspace…</span></div>
  if (!user) return <div className={styles.loading}><p>{notice?.text || 'Could not open the workspace.'}</p><button className={styles.button} onClick={logout}>Return to sign in</button></div>

  const title = NAV.find(item => item.id === tab)?.title
  const description = { overview: 'A clear view of your people, inquiries and opportunities.', contacts: 'Conversations that could become lasting partnerships.', applications: 'Find the next people who will help the firm grow.', people: 'The professionals behind Aequitas Law Partners.', users: 'The right access, for the right people.', settings: 'Your personal information and account preferences.' }[tab]
  const pagination = <footer className={styles.pagination}><span>{records.length ? `${(currentPage - 1) * pageSize + 1}–${Math.min(currentPage * pageSize, records.length)} of ${records.length} records` : '0 records'}</span><div className={styles.pageButtons}><button className={styles.iconButton} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} aria-label="Previous page"><span aria-hidden="true">‹</span></button><span>{currentPage} / {totalPages}</span><button className={styles.iconButton} disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)} aria-label="Next page"><span aria-hidden="true">›</span></button></div></footer>
  const selection = <input type="checkbox" aria-label="Select all on this page" checked={allSelected} disabled={busy || !selectable.length} onChange={event => setSelected(current => event.target.checked ? [...new Set([...current, ...selectable.map(row => row._id)])] : current.filter(id => !selectable.some(row => row._id === id)))} />
  const empty = <div className={styles.empty}><Icon name={tab} size={32} /><h3>No {tab === 'users' ? 'users' : tab === 'people' ? 'people' : 'submissions'} found</h3><p>{search || filter !== 'all' ? 'Try a different search or filter.' : 'New records will appear here.'}</p></div>

  return <div className={styles.shell}>
    {menuOpen && <button className={styles.mobileBackdrop} aria-label="Close navigation" onClick={() => setMenuOpen(false)} />}
    <aside className={styles.sidebar} data-open={menuOpen}><a className={styles.brand} href="/admin"><img src="/Logo-White.png" alt="ALP" /><div><strong>Aequitas<br />Law Partners</strong><small>Firm workspace</small></div></a><p className={styles.navLabel}>Manage workspace</p><nav className={styles.nav} aria-label="Workspace navigation">{NAV.filter(item => isAdmin || !['people', 'users'].includes(item.id)).map(item => <button key={item.id} data-active={tab === item.id} aria-current={tab === item.id ? 'page' : undefined} disabled={busy} onClick={() => setTab(item.id)}><Icon name={item.id} /><span>{item.title}</span>{['contacts', 'applications'].includes(item.id) && <span className={styles.navCount}>{data[item.id].length.toLocaleString('en-IN')}</span>}</button>)}</nav><div className={styles.sidebarBottom}><a className={styles.siteLink} href="/" target="_blank" rel="noopener noreferrer"><Icon name="external" size={15} />Visit public website</a><p className={styles.sidebarFoot}>EQUITY. JUSTICE. EXCELLENCE.</p></div></aside>
    <div className={styles.main}><header className={styles.topbar}><div className={styles.breadcrumb}><button className={`${styles.iconButton} ${styles.menuButton}`} onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Icon name="menu" /></button><span>Workspace</span><span>/</span><strong>{title}</strong></div><div className={styles.topActions}><span className={styles.workspaceTag}>ALP administration</span><div className={styles.account}><Avatar name={user.name || user.email} image={user.avatarUrl} /><div><strong>{user.name || user.email.split('@')[0]}</strong><small>{user.role === 'super_admin' ? 'Super admin' : isAdmin ? 'Administrator' : 'ALP'}</small></div></div><button className={styles.iconButton} onClick={logout} title="Sign out" aria-label="Sign out"><Icon name="logout" size={16} /></button></div></header>
      <main className={styles.content}><div className={styles.intro}><div><p className={styles.eyebrow}>{tab === 'overview' ? 'The firm, in focus' : 'Firm workspace'}</p><h1>{tab === 'overview' ? `Welcome${user.name ? `, ${user.name.split(' ')[0]}` : ' back'}.` : title}</h1><p className={styles.description}>{description}</p></div><div className={styles.introActions}>{tab === 'overview' && <span className={styles.description}>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })}</span>}<button className={styles.secondary} onClick={refresh} disabled={refreshing || busy}><Icon name="refresh" size={15} />{refreshing ? 'Refreshing…' : 'Refresh'}</button>{['people', 'users'].includes(tab) && <button className={styles.button} onClick={() => setEditor({ kind: tab })}><Icon name="plus" size={16} />Add {tab === 'people' ? 'person' : 'user'}</button>}</div></div>
      {notice && <div role={notice.error ? 'alert' : 'status'} className={styles.toast} data-error={Boolean(notice.error)}><Icon name={notice.error ? 'clock' : 'check'} size={16} /><span>{notice.text}</span><button onClick={() => setNotice(null)} aria-label="Dismiss notification"><Icon name="close" size={15} /></button></div>}
      {tab === 'overview' ? <><section className={styles.metricGrid} aria-label="Workspace totals">{[{ label: 'Contact inquiries', value: data.contacts.length, icon: 'contacts', hint: 'Conversations with the firm' }, { label: 'Career applications', value: data.applications.length, icon: 'applications', hint: 'Professionals looking to join us' }, { label: 'Awaiting review', value: reviewCount, icon: 'clock', hint: 'New inquiries & applications' }, { label: isAdmin ? 'People at ALP' : 'Reviewed submissions', value: isAdmin ? data.people.length : data.applications.filter(row => row.status === 'reviewed').length, icon: 'people', hint: isAdmin ? 'Published professional profiles' : 'Applications reviewed so far' }].map(metric => <article className={styles.metric} key={metric.label}><div><p className={styles.metricLabel}>{metric.label}</p><p className={styles.metricValue}>{metric.value.toLocaleString('en-IN')}</p><p className={styles.metricHint}>{metric.hint}</p></div><div className={styles.metricIcon}><Icon name={metric.icon} size={21} /></div></article>)}</section><div className={styles.twoColumns}><section className={styles.panel}><div className={styles.panelHeading}><h2>Latest activity</h2><button className={styles.textButton} onClick={() => setTab('applications')}>View applications<Icon name="arrow" size={14} /></button></div>{activity.length ? activity.map(row => <div className={styles.activity} key={`${row.kind}-${row._id}`}><span className={styles.activityIcon}><Icon name={row.kind} size={16} /></span><div style={{ flex: 1 }}><strong>{row.firstName} {row.lastName}</strong><p>{row.kind === 'contacts' ? `New inquiry · ${row.subject}` : `Career application · ${row.position}`}</p><time>{date(row.createdAt)} IST</time></div><Badge tone={row.status}>{row.status}</Badge></div>) : <div className={styles.empty}>Your latest submissions will appear here.</div>}</section><div><section className={styles.panel}><div className={styles.panelHeading}><h2>Quick actions</h2></div><div className={styles.quickGrid}>{(isAdmin ? [{ icon: 'people', title: 'Add a team member', hint: 'Create a public profile and ALP login', action: () => setEditor({ kind: 'people' }) }, { icon: 'users', title: 'Invite a workspace user', hint: 'Set up an administrator or ALP member', action: () => setEditor({ kind: 'users' }) }] : []).concat([{ icon: 'applications', title: 'Review applications', hint: 'Discover the next addition to the firm', action: () => setTab('applications') }, { icon: 'contacts', title: 'Read contact inquiries', hint: 'Stay on top of new conversations', action: () => setTab('contacts') }]).map(action => <button className={styles.quickAction} key={action.title} onClick={action.action}><Icon name={action.icon} size={19} /><span><strong>{action.title}</strong><small>{action.hint}</small></span><Icon name="arrow" size={15} /></button>)}</div></section><div className={styles.note}><strong>One firm. A shared standard.</strong>Keep profiles current, respond thoughtfully and give every opportunity the attention it deserves.</div></div></div></>
      : tab === 'settings' ? <div className={styles.settingsGrid}><section className={styles.panel}><div className={styles.panelHeading}><h2>Your profile</h2><Badge tone={user.role}>{user.role}</Badge></div><div className={styles.settingsBody}><div className={styles.profilePhoto}><Avatar name={user.name || user.email} image={user.avatarUrl} /><div><label className={styles.secondary}>Change photograph<input type="file" style={{ display: 'none' }} accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} disabled={busy} /></label><small>JPEG, PNG or WebP · maximum 200 KB</small></div></div><Field label="Full name"><input className={styles.input} value={user.name || user.email.split('@')[0]} readOnly /></Field><Field label="Email address"><input className={styles.input} value={user.email} readOnly /></Field><p className={styles.description}>{user.role === 'super_admin' ? 'Your super admin account is private and does not appear on the People page.' : 'Your account and professional profile share the same details. Keep them up to date here.'}</p><button className={styles.button} onClick={() => setEditor(user.role === 'super_admin' ? { kind: 'users', record: user } : { kind: 'people', self: true, record: ownPerson || user })}><Icon name="edit" size={15} />Edit personal &amp; professional profile</button></div></section><section className={styles.panel}><div className={styles.panelHeading}><h2>Change password</h2><Icon name="lock" size={18} /></div><form className={styles.settingsBody} onSubmit={changePassword}>{[{ key: 'currentPassword', label: 'Current password' }, { key: 'newPassword', label: 'New password' }, { key: 'confirmPassword', label: 'Confirm new password' }].map(item => <Field label={item.label} required key={item.key}><input className={styles.input} type="password" autoComplete={item.key === 'currentPassword' ? 'current-password' : 'new-password'} required minLength={item.key === 'currentPassword' ? undefined : 8} maxLength={72} value={password[item.key]} onChange={event => setPassword(current => ({ ...current, [item.key]: event.target.value }))} /></Field>)}<button className={styles.button} disabled={busy}>{busy ? 'Saving…' : 'Update password'}<Icon name="arrow" size={15} /></button></form></section></div>
      : <section className={styles.panel}><div className={styles.controls}><div className={styles.search}><Icon name="search" size={16} /><input className={styles.input} type="search" aria-label={`Search ${title}`} placeholder={`Search ${tab === 'people' ? 'people by name or expertise' : tab === 'users' ? 'users by name or email' : 'name, email or subject'}…`} value={search} onChange={event => setSearch(event.target.value)} /></div>{['contacts', 'applications', 'users'].includes(tab) && <select className={styles.select} aria-label={tab === 'users' ? 'Filter by role' : 'Filter by status'} value={filter} onChange={event => setFilter(event.target.value)}><option value="all">{tab === 'users' ? 'All roles' : 'All statuses'}</option>{(tab === 'users' ? ['super_admin', 'admin', 'alp'] : ['new', ...STATUS]).map(status => <option key={status} value={status}>{status === 'alp' ? 'ALP' : status === 'super_admin' ? 'Super admin' : status[0].toUpperCase() + status.slice(1)}</option>)}</select>}<div className={styles.controlsRight}>{tab === 'people' && <label style={{ display: 'flex', gap: 9, alignItems: 'center', fontSize: 11, color: '#718096' }}>{selection}Select page</label>}{selected.length > 0 ? <button className={styles.danger} disabled={busy} onClick={() => deleteItems(selected)}><Icon name="trash" size={14} />{busy ? 'Deleting…' : `Delete selected (${selected.length})`}</button> : <span style={{ fontSize: 11, color: '#8796aa' }}>{records.length.toLocaleString('en-IN')} {tab === 'contacts' ? 'inquiries' : tab}</span>}</div></div>
      {!shown.length ? empty : tab === 'people' ? <div className={styles.peopleGrid}>{shown.map(row => <article className={styles.personCard} key={row._id}><div className={styles.personPhoto}><Photo src={row.profile.image} alt={row.profile.name} /><label><input type="checkbox" aria-label={`Select ${row.profile.name}`} checked={selected.includes(row._id)} disabled={busy || protectedRecord(row)} onChange={() => toggle(row._id)} /></label></div><div className={styles.personBody}><h3>{row.profile.name}</h3><p>{row.profile.designation}</p><p>{row.profile.email}</p><div className={styles.personFooter}><Badge tone={row.role}>{row.role === 'admin' ? 'Administrator' : 'ALP'}</Badge><div className={styles.tableActions}><a className={styles.iconButton} href={`/people/${row.profileId}`} target="_blank" rel="noopener noreferrer" title="View public profile" aria-label={`View ${row.profile.name}'s public profile`}><Icon name="external" size={14} /></a><button className={styles.iconButton} title="Edit person" aria-label={`Edit ${row.profile.name}`} onClick={() => setEditor({ kind: 'people', record: row })}><Icon name="edit" size={14} /></button><button className={styles.iconButton} data-danger="true" title="Delete person" aria-label={`Delete ${row.profile.name}`} disabled={busy || protectedRecord(row)} onClick={() => deleteItems([row._id])}><Icon name="trash" size={14} /></button></div></div></div></article>)}</div>
      : <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>{selection}</th><th>{tab === 'users' ? 'User' : tab === 'contacts' ? 'From' : 'Applicant'}</th><th>{tab === 'users' ? 'Workspace role' : tab === 'contacts' ? 'Subject' : 'Position'}</th><th>{tab === 'users' ? 'Created' : 'Received'}</th>{tab !== 'users' && <th>Status</th>}<th style={{ textAlign: 'right' }}>Actions</th></tr></thead><tbody>{shown.map(row => <tr key={row._id} data-selected={selected.includes(row._id)}><td><input type="checkbox" aria-label={`Select ${row.name || (tab === 'users' ? row.email : `${row.firstName} ${row.lastName}`)}`} checked={selected.includes(row._id)} disabled={busy || protectedRecord(row)} onChange={() => toggle(row._id)} /></td><td><div className={styles.nameCell}><Avatar name={row.name || row.firstName || row.email} image={tab === 'users' ? row.avatarUrl : undefined} /><div><strong>{row.name || (tab === 'users' ? row.email.split('@')[0] : `${row.firstName} ${row.lastName}`)}{row._id === user._id && <small style={{ display: 'inline', marginLeft: 5 }}>(you)</small>}</strong><small>{row.email}</small></div></div></td><td>{tab === 'users' ? <Badge tone={row.role}>{row.role === 'super_admin' ? 'Super admin' : row.role === 'admin' ? 'Administrator' : 'ALP'}</Badge> : <span>{row.subject || row.position}{row.resumeMigrationIssue && <small style={{ display: 'block', fontSize: 9, color: '#b18b54', marginTop: 5 }}>Resume replacement needed</small>}</span>}</td><td><span style={{ fontSize: 10, color: '#7e8ea4' }}>{date(row.createdAt)}</span></td>{tab !== 'users' && <td><select className={styles.statusSelect} aria-label={`Status for ${row.firstName} ${row.lastName}`} value={row.status || 'pending'} onChange={event => updateStatus(row, event.target.value)}>{row.status === 'new' && <option value="new">New</option>}{STATUS.map(status => <option key={status} value={status}>{status === 'alp' ? 'ALP' : status === 'super_admin' ? 'Super admin' : status[0].toUpperCase() + status.slice(1)}</option>)}</select></td>}<td><div className={styles.tableActions}>{tab === 'users' ? <button className={styles.iconButton} title="Edit user" disabled={row.role === 'super_admin' && user.role !== 'super_admin'} aria-label={`Edit ${row.email}`} onClick={() => setEditor({ kind: 'users', record: row })}><Icon name="edit" size={14} /></button> : <><button className={styles.iconButton} title="View submission" aria-label={`View submission from ${row.firstName}`} onClick={() => setDetail({ row, kind: tab })}><Icon name="eye" size={14} /></button>{tab === 'applications' && <button className={styles.iconButton} disabled={Boolean(row.resumeMigrationIssue)} title={row.resumeMigrationIssue ? 'Resume replacement needed' : 'Download resume'} aria-label={`Download resume for ${row.firstName}`} onClick={() => download(row)}><Icon name="download" size={14} /></button>}</>}<button className={styles.iconButton} data-danger="true" title="Delete record" aria-label={`Delete ${row.name || row.firstName || row.email}`} disabled={busy || protectedRecord(row)} onClick={() => deleteItems([row._id])}><Icon name="trash" size={14} /></button></div></td></tr>)}</tbody></table></div>}{pagination}</section>}
      </main></div>
    {editor && <RecordEditor key={`${editor.kind}-${editor.record?._id || 'new'}`} {...editor} actor={user} api={api} onClose={closeEditor} onSaved={afterSave} />}
    {detail && <Drawer title={`${detail.row.firstName} ${detail.row.lastName}`} description={detail.kind === 'contacts' ? 'Contact inquiry' : 'Career application'} onClose={closeDetail}><div className={styles.drawerBody}><dl className={styles.details}>{[['Email address', detail.row.email], ['Phone number', detail.row.phone], [detail.kind === 'contacts' ? 'Subject' : 'Position', detail.row.subject || detail.row.position], ['Received', `${date(detail.row.createdAt)} IST`], ...(detail.kind === 'applications' ? [['Experience', detail.row.experience], ['Specializations', detail.row.specializations?.join(', ')]] : [])].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl><Badge tone={detail.row.status}>{detail.row.status}</Badge><h3 className={styles.sectionTitle} style={{ marginTop: 28 }}>{detail.kind === 'contacts' ? 'Message' : 'Cover letter'}</h3><div className={styles.messageBox}>{detail.row.message || detail.row.coverLetter || 'No cover letter provided.'}</div>{detail.kind === 'applications' && <div style={{ marginTop: 22 }}>{detail.row.resumeMigrationIssue ? <p className={styles.description}>This original resume remains in the legacy database and needs a compliant replacement.</p> : <button className={styles.button} onClick={() => download(detail.row)}><Icon name="download" size={16} />Download resume</button>}</div>}</div><footer className={styles.drawerFooter}><small>Confidential · Aequitas Law Partners</small><button className={styles.secondary} onClick={closeDetail}>Close</button></footer></Drawer>}
  </div>
}
