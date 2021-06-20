const TOKEN_KEY = 'PS_ACCESS_TOKEN'

export const saveAccessToken = (value: string) => {
  localStorage.setItem(TOKEN_KEY, value)
}

export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const clearAccessToken = () => {
  localStorage.removeItem(TOKEN_KEY)
}
