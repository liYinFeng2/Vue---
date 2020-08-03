import { observe, set, del } from '../observer/index'

export function stateMixin (Vue) {
  Vue.prototype.$set = set
  Vue.prototype.$delete = del
}

export function initState (vm) {
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) initData(vm)
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch) initWatch(vm, opts.watch)
}

function proxy (data, sourceKey, key) {
  Object.defineProperty(data, key, {
    get () {
      return data[sourceKey][key]
    },
    set (newVal) {
      data[sourceKey][key] = newVal
    }
  }) 
}

function initProps () {}
function initMethods () {}

// 数据初始化
function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data

  // 数据代理
  console.log(data)
  for (var key in data) {
    proxy(vm, '_data', key)
  }
  
  // 数据变化侦测
  observe(data)
}
function initComputed () {}
function initWatch () {}