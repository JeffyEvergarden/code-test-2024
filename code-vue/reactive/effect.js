export let activeEffect = undefined


export function effect(fn) {

  const effectObj = new ReactiveEffect(fn);

  effectObj.run();

}

class ReactiveEffect {
  constructor(fn) {
    this.fn = fn
  }

  run() {
    let lastEffect = activeEffect
    lastEffect = this
    const val = this.fn()
    activeEffect = lastEffect
    return val
  }
}


const deepMap = new WeakMap();

export function track(target, key) {
  let keysMap = deepMap.get(target);
  if (!keysMap) {
    keysMap = new Map();
    deepMap.set(target, keysMap)
  }

  let deps = keysMap.get(key);
  if (!deps) {
    deps = new Set()
    keysMap.set(key, deps)
  }
  if (activeEffect) {
    deps.add(activeEffect)
  }
}


export function trigger(target, key) {
  let keysMap = deepMap.get(target);
  if (!keysMap) {
    keysMap = new Map();
    deepMap.set(target, keysMap)
  }

  let deps = keysMap.get(key);
  if (!deps) {
    deps = new Set()
    keysMap.set(key, deps)
  }

  deps = Array.from(deps);

  deps.forEach(eObj => {
    eObj.run();
  });
}