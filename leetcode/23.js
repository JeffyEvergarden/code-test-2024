/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {

    while (lists.length > 1) {
        let result = []
        for (let i = 0; i < lists.length; i = i + 2) {

            let list = merge(lists[i], lists[i + 1])
            if (list) {
                result.push(list)
            }
        }
        lists = result
    }
    return lists[0] || null
};

var merge = function (list1, list2) {
    if (!list2) {
        return list1 || null
    }

    let head = new ListNode(0, null)
    let _head = head
    while (list1 && list2) {
        if (list1.val < list2.val) {
            _head.next = list1;
            list1 = list1.next;
        } else {
            _head.next = list2;
            list2 = list2.next;
        }
        _head = _head.next
        _head.next = null
    }

    if (list1) {
        _head.next = list1
    }
    if (list2) {
        _head.next = list2
    }
    return head.next
}