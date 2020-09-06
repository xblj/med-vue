import { observe } from '../observer/index';

export function initState(vm) {
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) initData(vm);
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch) initWatch(vm, opts.watch);
}

function initProps(vm, props) {}

function initMethods(vm, methods) {}

function initData(vm) {
  let data = vm.$options.data;
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

  observe(data);
}

function initComputed(vm, computed) {}

function initWatch(vm, watch) {}
