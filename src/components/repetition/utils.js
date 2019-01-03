export function genKey () {
  const t = 'xxxxxxxx'
  return t.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function getKey (route, keyName) {
  return `${route.name || route.path}?${route.query[keyName]}`
}

function isRegExp (pattern) {
  return Object.prototype.toString.call(pattern).substr(8, 6).toLocaleLowerCase() === 'regexp'
}

export function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  return false
}

export function isEqualObj (obj1, obj2) {
  if (obj1 === obj2) return true
  const key1 = Object.getOwnPropertyNames(obj1)
  const key2 = Object.getOwnPropertyNames(obj2)
  if (key1.length !== key2.length) return false
  for (const k of key1) {
    if (obj1[k] !== obj2[k]) {
      return false
    }
  }
  return true
}

export function _defineProperty (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      configurable: true,
      enumerable: true,
      writable: true
    })
  } else {
    obj[key] = value
  }
  return obj
}
