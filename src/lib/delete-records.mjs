import { rows, supabaseRequest, removeFiles, removeUserImages, removeImageFolder } from './supabase.mjs'

export function deletionIds(ids) {
  if (!Array.isArray(ids) || !ids.length || ids.length > 1000 || ids.some(id => typeof id !== 'string' || !/^[a-zA-Z0-9-]{1,64}$/.test(id))) {
    throw new Error('Select between 1 and 1,000 valid records')
  }
  return [...new Set(ids)]
}

export async function deleteRecords(table, ids, actorId) {
  const deletedIds = [], failed = []
  const superAdmins = table === 'users' ? await rows('users', 'role=eq.super_admin&select=_id') : []
  const permitted = ids.filter(id => {
    if (superAdmins.some(user => user._id === id)) {
      failed.push({ id, message: 'The super admin account cannot be deleted' })
      return false
    }
    if (table !== 'users' || id !== actorId) return true
    failed.push({ id, message: 'You cannot delete your own account' })
    return false
  })
  // Bound URL lengths and remove files together instead of making a request per file.
  for (let offset = 0; offset < permitted.length; offset += 50) {
    const batch = permitted.slice(offset, offset + 50)
    const query = `_id=in.(${batch.join(',')})`
    try {
      const records = await rows(table, query)
      await removeFiles('resumes', records.map(record => record.resumePath).filter(Boolean))
      if (table === 'users') {
        await Promise.all(records.filter(record => record.profileId).map(record => removeImageFolder(`profiles/${record.profileId}`)))
        await Promise.all(records.map(record => removeUserImages(record._id)))
        await removeFiles('people', records.map(record => record.imagePath).filter(Boolean))
      }
      // Keep rows when storage cleanup fails, allowing the deletion to be retried.
      await supabaseRequest(`/rest/v1/${table}?${query}`, { method: 'DELETE' })
      // Missing rows are already deleted, making repeated requests harmless.
      deletedIds.push(...batch)
    } catch {
      failed.push(...batch.map(id => ({ id, message: 'File or record deletion failed; retry this record' })))
    }
  }
  return { success: failed.length === 0, deletedIds, failed }
}
