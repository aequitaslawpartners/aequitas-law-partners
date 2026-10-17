'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { Field, Icon } from '../ui'
import styles from '../admin.module.css'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const submit = async event => {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email.trim().toLowerCase(), password }) })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Could not sign in. Please try again.')
      const options = { expires: 1, sameSite: 'strict', secure: window.location.protocol === 'https:', path: '/' }
      Cookies.set('admin_token', result.token, options)
      Cookies.set('admin_user', JSON.stringify(result.user), options)
      router.replace('/admin')
    } catch (error) { setError(error.message) }
    finally { setBusy(false) }
  }
  return <main className={styles.login}><section className={styles.loginArt}><a className={styles.brand} href="/"><img src="/Logo-White.png" alt="ALP" /><div><strong>Aequitas<br />Law Partners</strong><small>Elevating legal excellence</small></div></a><div className={styles.loginArtCopy}><p className={styles.eyebrow}>The firm, connected.</p><h1>A shared purpose.<br />A higher standard.</h1><p>Your dedicated space to manage the people, conversations and opportunities shaping our firm.</p></div><svg className={styles.mountains} viewBox="0 0 700 350" preserveAspectRatio="none" fill="none" aria-hidden="true"><path d="M-40 350L220 70l100 140 85-180 320 320M30 350L220 125l95 148 92-183 245 260M115 350l106-155 100 138 85-178 169 195M220 70l-25 280M405 30l-84 303" stroke="currentColor" strokeWidth="1.5" /></svg><p className={styles.loginArtFooter}>EQUITY. JUSTICE. FAIRNESS. SYMMETRY.</p></section><section className={styles.loginPanel}><div className={styles.loginBox}><div className={styles.loginLock}><Icon name="lock" size={21} /></div><p className={styles.eyebrow}>ALP firm workspace</p><h2>Welcome back.</h2><p>Sign in to continue to your workspace.</p>{error && <div className={styles.toast} data-error="true" role="alert">{error}</div>}<form onSubmit={submit}><Field label="Email address" required><input className={styles.input} type="email" autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} required placeholder="name@alplaw.in" /></Field><Field label="Password" required><div className={styles.passwordInput}><input className={styles.input} type={visible ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} required placeholder="Enter your password" /><button type="button" aria-label={visible ? 'Hide password' : 'Show password'} onClick={() => setVisible(current => !current)}><Icon name="eye" size={18} /></button></div></Field><button className={`${styles.button} ${styles.loginSubmit}`} disabled={busy}>{busy ? 'Signing in…' : 'Sign in to workspace'}<Icon name="arrow" size={16} /></button></form><p className={styles.loginHelp}>Need access or help signing in?<br />Please contact your firm administrator.</p></div><p className={styles.loginBottom}><Icon name="lock" size={12} />Private workspace · Aequitas Law Partners</p></section></main>
}
