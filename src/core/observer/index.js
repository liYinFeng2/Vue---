import { isObj, isUndef, isPrimitive, hasOwn, isValidArrayIndex, def, warn } from '../utils/index'
import { arrayMethods } from './array'

const arrKeys = Object.getOwnPropertyNames(arrayMethods)

class Observer {
  constructor (data) {
    this.data = data
    def(data, '__ob__', this)
    if (Array.isArray(data)) {
      if (data.__proto__) {
        protoArgments(data, arrayMethods)
      } else {
        copyArgments(data, arrayMethods, arrKeys)
      }
      this.observerArray(data)
    } else {
      this.walk(data)
    }
  }

  observerArray (data) {
    for (var i=0; i<data.length; i++) {
      observe(data[i])
    }
  }

  walk (data) {
    var keys = Object.keys(data)
    for (var i=0; i< keys.length; i++) {
      let key = keys[i]
      defineReactive(data, key, data[key])
    }
  }
}

function protoArgments (val, src) {
  val.__proto__ = src
}

function copyArgments (val, src, methods) {
  for (var i=0; i<methods.length; i++) {
    let key = methods[i]
    def(val, key, src[key])
  }
}

function defineReactive (obj, key, val) {
  observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get () {
      return val
    },
    set (newVal) {
      if (val === newVal) return
      val = newVal
      console.log('更新了~')
    }
  })
}

export function observe (data) {
  if (!isObj(data)) return

  return new Observer(data)
}

export function del (target, key) {
  if (isUndef(target) || isPrimitive(target)) {
    return warn(`Cannot set reactive property on undefined, null, or primitive value: ${target}`)
  }

  if (Array.isArray(target) || isValidArrayIndex(key)) {
    target.splice(key, 1)
    return
  }

  if (!hasOwn(target, key)) {
    return
  }
  delete target[key]

  // 依赖收集这个时候，应该要看是否有__ob__，有的话，即被监测，应该要通知
}

export function set (target, key, val) {
  if (isUndef(target) || isPrimitive(target)) {
    return warn(`Cannot set reactive property on undefined, null, or primitive value: ${target}`)
  }

  if (Array.isArray(target) || isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return
  }
  
  // key存在target上
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }

  const ob = target.__ob__
  
  // 没有响应式处理过，直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 在响应式对象上添加新的属性
  defineReactive(ob.data, key, val)

  // 依赖收集这个时候，应该要看是否有__ob__，有的话，即被监测，应该要通知

  return val
} 