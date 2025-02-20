/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * // 插入排序
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList2 = function (head) {
  let newHead = new ListNode(undefined, null)

  while (head) {
    let target = head
    head = head.next

    let _newHead = newHead

    while (_newHead.next && target.val > _newHead.next.val) {
      _newHead = _newHead.next
    }

    target.next = _newHead.next

    _newHead.next = target
  }

  return newHead.next
}

// 归并排序
var sortList = function (head) {
  return mergeSort(head, null)
}

function mergeSort(head, tail) {
  if (!head) {
    return head
  }

  if (head.next === tail) {
    head.next = null
    return head
  }

  let slow = head
  let fast = head

  while (fast !== tail) {
    slow = slow.next
    fast = fast.next
    if (fast !== tail) {
      fast = fast.next
    }
  }

  let mid = slow

  let list1 = mergeSort(head, mid)

  let list2 = mergeSort(mid, tail)

  let target = merge(list1, list2)

  return target
}

function merge(list1, list2) {
  let head = new ListNode(undefined, null)
  let _head = head
  while (list1 && list2) {
    if (list1.val > list2.val) {
      _head.next = list2
      list2 = list2.next
      _head = _head.next
      _head.next = null
    } else {
      _head.next = list1
      list1 = list1.next
      _head = _head.next
      _head.next = null
    }
  }

  if (!list1) {
    _head.next = list2
  } else {
    _head.next = list1
  }

  return head.next
}
