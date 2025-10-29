// 590. N叉树的后序遍历  https://leetcode.cn/problems/n-ary-tree-postorder-traversal/description/
// 给定一个 n 叉树的根节点 root ，返回 其节点值的 后序遍历 。

// n 叉树 在输入中按层序遍历进行序列化表示，每组子节点由空值 null 分隔（请参见示例）。
/**
 * // Definition for a _Node.
 * function _Node(val, children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

function _Node(val, children) {
  this.val = val
  this.children = children
}

/**
 * @param {_Node|null} root
 * @return {number[]}
 */
var postOrder = function (root) {
  if (!root) {
    return []
  }

  let stack = [root]

  let indexStack = [-1]

  let result = []

  while (stack.length) {
    let node = stack.pop()
    let index = indexStack.pop()
    if (node === null || node === undefined) {
      continue
    }
    // 输出结果
    if (node.children.length === 0) {
      result.push(node.val)
      continue
    }

    if (node.children.length && index < node.children.length) {
      stack.push(node)
      indexStack.push(index + 1)

      stack.push(node.children[index + 1])
      indexStack.push(-1)
    } else if (node.children.length && index === node.children.length) {
      result.push(node.val)
    }
  }

  return result
}
