export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

const _toString = Object.prototype.toString;

export function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

export function def(obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true,
  });
}
