import { activeEffect, track, trigger } from "./effect.js"

export const baseHandler = {

  get(target, key, recevier) {
    track(target, key);
    return Reflect.get(target, key, recevier);
  },

  set(target, key, value) {
    const flag = Reflect.set(target, key, value);
    trigger(target, key)
    return flag
  }
}