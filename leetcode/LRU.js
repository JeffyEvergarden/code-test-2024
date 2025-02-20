function ListNode(x, y) {
  this.pre = null
  this.next = null

  this.key = x
  this.value = y
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.maxSize = capacity
  this.size = 0
  this.startNode = new ListNode(null, null)
  this.startNode.pre = this.startNode
  this.startNode.next = this.startNode
}

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  this._console()
  let target = this._get(key)

  if (target === null) {
    return -1
  }

  // 放到最后
  target.pre.next = target.next
  target.next.pre = target.pre

  target.pre = this.startNode.pre
  target.pre.next = target
  target.next = this.startNode
  this.startNode.pre = target

  return target.value

}

LRUCache.prototype._get = function (key) {
  let node = this.startNode.next
  let target = null

  while (node !== this.startNode) {
    if (node.key === key) {
      target = node
      break;
    }
    node = node.next
  }

  if (!target) {
    return null
  }

  return target

}

LRUCache.prototype._console = function () {
  const arr = []
  let node = this.startNode.next
  while (node !== this.startNode) {
    arr.push(node.key)
    node = node.next
  }
  console.log(arr);
}


LRUCache.prototype.delete = function () {
  this.
}




/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const target = this._get(key)

  if (target !== null) {
    target.pre.next = target.next
    target.pre = this.startNode.pre
    target.pre.next = target
    target.next = this.startNode
    target.value = value
    return value
  }

  if (this.size >= this.maxSize) {
    this.size--
    const deleteNode = this.startNode.next
    this.startNode.next = deleteNode.next
    this.startNode.next.pre = this.startNode
  }

  const node = new ListNode(key, value)
  const pre = this.startNode.pre
  node.pre = pre
  pre.next = node
  node.next = this.startNode
  this.startNode.pre = node
  this.size++
  return value
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
