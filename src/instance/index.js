import { initMixin } from './init';

function Vue(options) {
  this._init(options);
}

// 为Vue添加原型方方法_init
initMixin(Vue);

export default Vue;
