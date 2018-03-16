import * as idb from 'idb'

const storeName = 'wejay'
const storeVersion = 1

const dbPromise = idb.open(storeName, storeVersion, upgradeDb => {
  const users = upgradeDb.createObjectStore('users', { keyPath: 'id' })
  users.createIndex('email', 'email', { unique: true })
})

export const getValue = async key => {
  const db = await dbPromise

  return db
    .transaction('users')
    .objectStore('users')
    .get(key)
}

export const put = async value => {
  const db = await dbPromise
  const tx = db.transaction('users', 'readwrite')

  tx.objectStore('users').put(value)

  return tx.complete
}
