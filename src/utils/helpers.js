export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export const uidGenerator = () => (Date.now().toString(36).substr(2) + Math.random().toString(36).substr(2))