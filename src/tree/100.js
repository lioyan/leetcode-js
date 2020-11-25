/**
 * 100. 相同的树
 * easy
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

 * 示例 1:
 * 输入:       1         1
 *           / \       / \
 *          2   3     2   3
 * 
 *         [1,2,3],   [1,2,3]
 * 输出: true

 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/same-tree
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    // 递归 dfs
    // 根据题目描述，"两棵树比较”可以推测，递归函数要接受两个参数，分别是两棵树的相同位置的节点
    function traversal(node1,node2) {
      if(node1 === null && node2 === null) return true // 都是null，返回true
      if(node1 === null || node2 === null) return false // 一个有值，一个为null，返回false
      // 当前两颗树的节点相等，并且左子树相等，并且右子树相等，才会返回true
      return node1.val === node2.val && traversal(node1.left, node2.left) && traversal(node1.right, node2.right)
    }
    return traversal(p,q)
};

var isSameTree = function(p, q) {
  // 迭代 bfs
  // 两个队列
  let queue1 = [p], queue2 = [q]

  while(queue1.length && queue2.length) {
    // 依次比较两个队列出列的节点
    let node1 = queue1.shift(), node2 = queue2.shift()
    if(node1 === null && node2 === null) continue
    if(node1 === null || node2 === null) return false
    if(node1.val !== node2.val) return false
    queue1.push(node1.left, node1.right)
    queue2.push(node2.left, node2.right)
  }
  return true
}