/**
 * 94. 二叉树的中序遍历
 * medium
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

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
var inorderTraversal = function(root) {
  // 递归解法
  let res = []
  function traversal(node) {
    if(!root) return
    traversal(node.left)
    res.push(node.val)
    traversal(node.right)
  }
  traversal(root)
  return res
}

var inorderTraversal = function(root) {
  // 迭代解法
  let res = [],stack = [] // 利用栈结构，寻找left，如果没有就出栈
  let node = root // 当前节点
  while(node || stack.length) { //  判断条件node为叶子节点或者stack清空为止
    if(node) {
      stack.push(node) // 进栈
      node = node.left
    }else {
      let tmp = stack.pop() // 当前节点为null,即叶子节点，出栈
      res.push(tmp.val)
      node = tmp.right
    }
  }
  return res
}