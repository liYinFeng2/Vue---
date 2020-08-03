import { def } from '../utils/tools'

let arrayProto = Array.prototype
const methods = [
  'push',
  'pop',
  'unshift',
  'shift',
  'reverse',
  'sort', 
  'splice'
]

export const arrayMethods = Object.create(arrayProto)

methods.forEach(method => {
  let originMethod = arrayMethods[method]
  def(arrayMethods, method, function (...args) {
    let result = originMethod.apply(this, args)
    let ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.splice(2)
        break
    }
    inserted && ob.observerArray(inserted)
    console.log('拦截器~') 
    return result
  })
})