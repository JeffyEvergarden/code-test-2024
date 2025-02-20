/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {

    const _head = new ListNode(0, null);
    _head.next = head

    let tmp = _head

    while (tmp && tmp.next) {

        let node1 = tmp.next
        let node2 = tmp.next.next

        if (!node2) {
            break
        }

        node1.next = node2.next
        node2.next = node1
        tmp.next = node2

        tmp = node1
    }


    return _head.next
};