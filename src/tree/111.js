/**
 * 111. 二叉树的最小深度
 * easy
 * 给定一个二叉树，找出其最小深度。
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 * 说明：叶子节点是指没有子节点的节点。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/minimum-depth-of-binary-tree
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
 * @return {number}
 */
var minDepth = function(root) {
  // 递归
  function traversal(node) {
    if(!node.left && !node.right) return 0
    if(!node.left) return traversal(node.right) + 1
    if(!node.right) return traversal(node.left) + 1
    return Math.min(traversal(node.left), traversal(node.right)) + 1
  }
  return traversal(root)
  // 此解法效率太慢，会递归所有的节点，最早遇到最小深度的叶子节点时，并不会停止递归
};

var minDepth = function(root) {
  // 迭代解法1，层序遍历，bfs
  if(!root) return 0
  let queue = [root], // 队列初始值root
    res = 1 // 队列初始值root，所以，res初始为1

  while(queue.length) {
    let n = queue.length
    for(let i = 0; i < n; i++) {
      let node = queue.shift()
      // 如果当前节点没有左子树和右子树，那么它为叶子节点，返回
      if(!node.left && !node.right) return res
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    // 队列出队的当前层的所有节点都有子节点，res++
    res++
  }
}

var minDepth = function(root) {
  // 迭代解法2,对比迭代解法1区别是：不需要迭代当前队列，而是入队时带上深度
  if(!root) return 0
  let queue = [root, 1]

  while(queue.length) {
    let node = queue.shift(), depth = queue.shift()

    if(!node.left && !node.right) return depth

    node.left && queue.push(node.left, depth + 1)
    node.right && queue.push(node.right, depth + 1)
  }
}