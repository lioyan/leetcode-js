/**
 * 98. 验证二叉搜索树
 * medium
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 * 
 * 假设一个二叉搜索树具有如下特征：
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。

 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/validate-binary-search-tree
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
var isValidBST = function(root) {
  // 递归解法1 中序遍历，比较上一个值和当前节点的值
  let last, // 记录遍历的上一个值
    res = true // 结果，初始true
  function traversal(node) {
    if(!node) return
    traversal(node.left)
    if(last === undefined || last < node.val) {
      // last第一次赋值，或者上一个值小于当前值，继续
      last = node.val
    }else {
      // 如果上一个值大于当前值，条件不成立，结束
      res = false
      return
    }
    traversal(node.right)
  }
  traversal(root)
  return res
};

var isValidBST = function(root) {
  // 递归解法2 制定当前节点值的上下边界，满足则成立
  function traversal(node,min,max) {
    if(!node) return true // node为null，返回true
    // 满足条件：node的值在min和max之间，并且node.left,node.right也满足此条件
    // node.left的值的上限为当前节点，
    // node.right的值的下限为当前节点
    return node.val > min && node.val < max & traversal(node.left, min,node.val) && traversal(node.right, node.val, max)
  }
  // 根节点的上下限初始为正负无穷
  let min = -Infinity, max = Infinity
  return traversal(root, min, max)
}

var isValidBST = function(root) {
  // 迭代 栈，比较上一个的值和当前节点的值
  let last // 出栈的上一个值，用来和出栈的当前值比较
  let stack = [] // 栈
  let node = root // 当前节点,初始赋值root
  while(node || stack.length) {
    if(node) {
      stack.push(node)
      node = node.left
    }else {
      let tmp = stack.pop()
      if(last === undefined || last < tmp.val) {
        last = tmp.val
      } else {
        return false // 上一个值大于当前值，条件不成立
      }
      node = tmp.right
    }
  }
  return true
}