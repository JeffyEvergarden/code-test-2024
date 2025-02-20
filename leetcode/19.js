/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
    let _head = new ListNode()
    let _head2 = _head
    _head.next = head


    // 算出个数
    let num = 0
    while (head) {
        num++
        head = head.next
    }

    // 5个节点，倒1 -> 5, 倒2 -> 4,
    // 2
    //  0------> 1 ----> 2 --------> null

    num = num - n

    if (num <= 0) {
        return _head2.next
    }

    while (num--) {
        _head = _head.next
    }
    if (_head.next) {
        _head.next = _head.next.next
    }
    return _head2.next
};