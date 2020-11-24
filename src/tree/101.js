/**
 * 101. 对称二叉树
 * easy
 * 给定一个二叉树，检查它是否是镜像对称的。
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
        1
       / \
      2   2
     / \ / \
    3  4 4  3
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/symmetric-tree
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
 * @return {boolean}
 */
var isSymmetric = function(root) {
    // bfs 队列一次压入弹出两个元素
    if(!root) return true
    let queue = [root.left,root.right] // 位于对称位置的两个元素
    let l,r
    while(queue.length) {
      l = queue.shift(),r = queue.shift()
      if(!l && !r) continue
      if(!l || !r || l.val !== r.val) return false
      queue.push(l.left, r.right, l.right, r.left) // 依次压入对称位置的元素
    }
    return true
};

var isSymmetric = function(root) {
  // 递归解法
  if(!root) return true
  const dfs = (left,right) => {
    if(!left && !right) return true
    if(!left || !right || left.val !== right.val) return false
    return dfs(left.left, right.right) && dfs(left.right,right.left)
  }

  return dfs(root.left,root.right)
}