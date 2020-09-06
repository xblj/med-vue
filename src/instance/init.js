import { initState } from './state';
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    const vm = this;
    vm.$options = options;
    // 根据vue传入的参数初始化vue的状态
    initState(vm);
  };
}
