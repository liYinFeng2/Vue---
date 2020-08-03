import { initMixin } from './init'
import { stateMixin } from './state'

import { warn } from '../utils/index'

function Vue (options) {
  if (!(this instanceof Vue)) {
    return warn('Vue is a constructor and should be called with the `new` keyword')
  }

  this._init(options)
}

initMixin(Vue)
stateMixin(Vue)

export default Vue