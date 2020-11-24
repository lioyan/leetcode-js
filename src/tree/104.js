/**
 * 104. 二叉树的最大深度
 * easy
 * 给定一个二叉树，找出其最大深度。
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/maximum-depth-of-binary-tree
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  // 解法1：递归
  return !root ? 0 : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
var maxDepth = function(root) {
  // 解法2：bfs，层数即深度
  if(!root) return 0
  let max = 0,queue = [root] // 维护一个队列
  while(queue.length) {
    let n = queue.length
    for(let i = 0; i < n; i++) {
      let node = queue.shift() // 依次弹出同层的node
      node.left && queue.push(node.left) // 压入下一层的node
      node.right && queue.push(node.right) // 压入下一层的node
    }
    max++ // 队列清空一次，max++，深度+1
  }
  return max
};
