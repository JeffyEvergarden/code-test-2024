import { baseHandler } from "./baseHandler.js";

const proxyMap = new WeakMap()


export function reactive(target) {

  if (typeof target !== 'object') {
    return target
  }

  return createReactiveObject(target);

}

function createReactiveObject(target) {

  if (proxyMap.get(target)) {
    return proxyMap.get(target)
  }

  let proxy = new Proxy(target, baseHandler)
  proxyMap.set(target, proxy)
  return proxy
}