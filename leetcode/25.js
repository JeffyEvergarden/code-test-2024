/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var reverseKGroup = function (head, k) {

    const _head = new ListNode(0, head)
    let tmp = _head
    let i = 0
    while (tmp) {
        let n = k;
        let flag = hasK(tmp, n)
        console.log(flag, tmp.val)
        if (flag) {
            let nextNode = next(tmp, n);
            tmp.next = reverse(tmp.next);
            while (tmp.next) {
                tmp = tmp.next
            }
            tmp.next = nextNode
        } else {
            break
        }
    }

    return _head.next
};



function hasK(head, k) {
    if (k <= 0 || !head) {
        return false
    }
    while (k--) {
        head = head.next
        if (!head) {
            return false
        }
    }
    return true
}

// x--1---2---3---4
function next(head, k) {
    while (k--) {
        head = head.next
        if (!head) {
            return null
        }
    }
    let nextNode = head.next
    head.next = null

    return nextNode
}

function reverse(head) {
    let newList = null
    while (head) {
        let tmp = head
        head = head.next
        tmp.next = newList
        newList = tmp
    }
    return newList
}