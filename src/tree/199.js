/**
 * 199. 二叉树的右视图
 * medium
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 示例:
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1, 3, 4]
 * 解释:
 *     1            <---
 *   /   \
 *  2     3         <---
 *   \     \
 *    5     4       <---
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binary-tree-right-side-view
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
 * @return {number[]}
 */
var rightSideView = function(root) {
  // 递归 dfs
  // 需要一个辅助参数index，记录层级
  // 重复写res[inx]，用当前层最右边的节点的值为终值
  let res = [], index= 0
  function traversal(node, inx) {
    if(!node) return
    res[inx] = node.val
    // 先左，后右
    traversal(node.left, inx + 1)
    traversal(node.right, inx + 1)
  }
  traversal(root,index)
  return res
};

var rightSideView = function(root) {
  // 迭代 bfs
  // 右视图，即每一层的最右侧节点
  if(!root) return []
  let queue = [root],res = []
  while(queue.length) {
    let n = queue.length
    for(let i = 0; i < n; i++) {
      let node = queue.shift()
      if(i === n-1) res.push(node.val)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }
  return res
}