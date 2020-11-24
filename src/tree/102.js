/**
 * 102. 二叉树的层序遍历
 * medium
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binary-tree-level-order-traversal
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
 * @return {number[][]}
 */
var levelOrder = function(root) {
  // bfs解法
  if(!root) return []
  let res = [],
    index = 0, // 记录深度，即res的索引
    queue = [root] // 维护队列
  while(queue.length) {
    let n = queue.length
    res[index] = [] // 初始化res当前索引的元素为一个数组
    for(let i = 0; i < n; i++) {
      let node = queue.shift()
      res[index].push(node.val) // 队列取出的node值放入res
      node.left && queue.push(node.left) // node的下层节点压入队列
      node.right && queue.push(node.right) // node的下层节点压入队列
    }
    index++ // 队列清空一次，深度index++，更新res的当前索引
  }
  return res
};

var levelOrder = function(root) {
  // 递归解法
  if(!root) return []
  let res = [],index = 0 // 初始深度index
  const dfs = (node, index, res) => {
    if(!node) return 
    if(!res[index]) res[index] = [] // 初始索引为index时res元素为数组
    res[index].push(node.val) // 记录当前node的值
    index++ // 深度+1
    dfs(node.left, index, res) // 递归下一层
    dfs(node.right, index, res) // 递归下一层
  }
  dfs(root, index, res)
  return res
};