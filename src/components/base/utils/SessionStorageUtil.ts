export function setSession(data: any, storageKey: string) {
  const userString = JSON.stringify(data)
  sessionStorage.setItem(storageKey, userString)
}

export function setLocalStorage(data: any, storageKey: string) {
  const userString = JSON.stringify(data)
  localStorage.setItem(storageKey, userString)
}

export function getSession(storageKey: string) {
  const data = sessionStorage.getItem(storageKey)
  return JSON.parse(data!)
}

export function getLocalStorage(storageKey: string) {
  const data = localStorage.getItem(storageKey)
  return JSON.parse(data!)
}

export function removeSession(storageKey: string) {
  sessionStorage.removeItem(storageKey)
}

export function removeLocalStorage(storageKey: string) {
  localStorage.removeItem(storageKey)
}

