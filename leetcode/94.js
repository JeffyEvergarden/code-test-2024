// 144. 二叉树的前序遍历
// https://leetcode.cn/problems/binary-tree-inorder-traversal/description/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  let stack = [root]
  let typeStack = [1]
  let target = []

  while (stack.length) {
    let node = stack.pop()
    let type = typeStack.pop()

    if (node === null) {
      //
    } else if (type === 1) {
      stack.push(node)
      typeStack.push(2)
      stack.push(node.left)
      typeStack.push(1)
    } else if (type === 2) {
      target.push(node.val)
      stack.push(node.right)
      typeStack.push(1)
    }
  }

  return target
}
