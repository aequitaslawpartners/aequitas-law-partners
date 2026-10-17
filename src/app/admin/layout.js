import styles from './admin.module.css'

export const metadata = { title: 'ALP | Firm workspace', robots: { index: false, follow: false } }

export default function AdminLayout({ children }) {
  return <div className={styles.root}>{children}</div>
}
