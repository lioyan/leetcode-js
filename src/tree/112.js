/**
 * 112. 路径总和
 * easy
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 * 说明: 叶子节点是指没有子节点的节点。
 * 示例: 
 * 给定如下二叉树，以及目标和 sum = 22，
 *               5
 *              / \
 *             4   8
 *            /   / \
 *           11  13  4
 *          /  \      \
 *         7    2      1
 * 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/path-sum
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
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
  // 递归 dfs
  if(!root) return false
  let res = false
  function traversal(node,total) { // total保证层级相同的节点接受的total是相同的
    if(!node) return
    total -= node.val
    // 累计和为sum时，判断当前节点是否为叶子节点，是的话返回true
    if(!node.left && !node.right && total === 0) res = true  
    node.left && traversal(node.left, total) // total保证层级相同的节点接受的total是相同的
    node.right && traversal(node.right, total) // total保证层级相同的节点接受的total是相同的
  }
  traversal(root, sum)
  return res
};

var hasPathSum = function(root, sum) {
  // 迭代1  dfs 栈
  // dfs的迭代用栈结构，bfs的迭代用队列结构
  if(!root) return false
  // 题目要求是求和，所以增加栈结构要增加一个辅助元素：当前和
  let stack = [root, sum]
  while(stack.length) {
    let total = stack.pop()
    let node = stack.pop()
    total -= node.val
    // 累计和为sum，且为叶子节点，返回true
    if(total === 0 && !node.left && !node.right) return true
    // 此处先压栈右节点或者左节点都是可以的
    // 先压右节点，相当于前序遍历
    node.right && stack.push(node.right, total)
    node.left && stack.push(node.left, total)
  }
  return false
}

var hasPathSum = function(root, sum) {
  // 迭代2 bfs 队列
  // bfs层序遍历也是可行的
  // 类似上面的迭代dfs解法，这里的队列也需要辅助元素
  if(!root) return false
  let queue = [root, sum]
  while(queue.length) {
    let node = queue.shift()
    let total = queue.shift()
    total -= node.val
    if(total === 0 && !node.left && !node.right) return true
    node.left && queue.push(node.left, total)
    node.right && queue.push(node.right, total)
  }
  return false
}