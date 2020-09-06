import { isObject, hasOwn, isPlainObject, def } from '../shared/util';

export function observe(value) {
  // 如果不是对象的话，就不需要再进行响应式处理
  if (!isObject(value)) return;
  let ob;
  // 如果当前对象的已经是可监听的对象了就直接返回
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (isPlainObject(value) && Object.isExtensible(value)) {
    ob = new Observer(value);
  }
  return ob;
}

class Observer {
  constructor(value) {
    this.value = value;
    // 给监听对象上添加一个__ob__的属性，指向当前Observer的实例
    def(value, '__ob__', this);
    if (Array.isArray(value)) {
      // TODO:
    } else {
      // 如果是普通对象的话，就依次的遍历每一个key，进行响应式的监听
      this.walk(value);
    }
  }

  walk(obj) {
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i]);
    }
  }
}

/**
 * 通过defineProperty对对象的每一个属性都进行get/set拦截
 */
function defineReactive(obj, key, val) {
  observe(val);

  if (!val) val = obj[key];

  const property = Object.getOwnPropertyDescriptor(obj, key);
  // 如果某一个key不可配置，那么就不需要监听，就直接返回
  if (property && property.configurable === false) return;

  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      // 用户的赋值可能是一个对象，所以需要再监听一次
      observe(newVal);
      val = newVal;
    },
  });
}
