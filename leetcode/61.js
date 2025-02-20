/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
 var rotateRight = function (head, k) {


    if (!head) {
        return null
    }

    let _head = head

    let total = 1
    let tail = head
    while (tail.next) {
        tail = tail.next
        total++
    }

    tail.next = head
    k = k % total

    let num = total - k - 1

    while (num--) {
        _head = _head.next
    }


    tail = _head.next
    _head.next = null

    return tail
};