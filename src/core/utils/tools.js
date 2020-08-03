export function warn (msg) {
  console.error(`[Vue error]: ${msg}`)
}

export function isObj (val) {
  return typeof val === 'object' && val !== null
}

export function def (obj, key, value) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    configurable: false,
    value
  })
}

export function isUndef (val) {
  return val === undefined || val === null
}

export function isPrimitive (val) {
  return (
    typeof val === 'string' ||
    typeof val === 'number' ||
    typeof val === 'boolean'
  )
}

export function isValidArrayIndex (val) {
  const n = parseFloat(String(val))
  return n >= 0 && Math.floor(n) === n
}

const hasOwnProperty = Object.prototype.hasOwnProperty
export function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}