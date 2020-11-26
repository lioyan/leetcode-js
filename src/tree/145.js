/**
 * 145. 二叉树的后序遍历
 * medium
 * 给定一个二叉树，返回它的 后序 遍历。
 * 示例:
 * 输入: [1,null,2,3]  
 *    1
 *     \
 *      2
 *     /
 *    3 
 * 输出: [3,2,1]
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binary-tree-postorder-traversal
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
var postorderTraversal = function(root) {
    // 递归 dfs
    let res = []
    function traversal(node) {
      if(!node) return 
      traversal(node.left)
      traversal(node.right)
      res.push(node.val)
    }
    traversal(root)
    return res
};

var postorderTraversal = function(root) {
  // 迭代解法1 逆序解
  // dfs 栈
  // 后序遍历顺序：左-右-根
  // 后序遍历是三种遍历方法里面最难的
  // 我们可以换个思路，已知前序遍历的顺序是：根-左-右
  // 和后续遍历顺序相比的话，就是倒序，然后左右互换
  // so, 看代码
  if(!root) return []
  let stack = [root], res = []
  while(stack.length) {
    let node  = stack.pop()
    // 将当前node的值插入res前面
    res.unshift(node.val)
    // 此处left和right进栈顺序和前序遍历相反
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }
  return res
}

var postorderTraversal = function(root) {
  // 迭代解法2 顺序解
  // 正规的后续遍历迭代解法
  // dfs 栈
  // TODO:
  
}