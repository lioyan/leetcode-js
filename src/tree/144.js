/**
 * 144. 二叉树的前序遍历
 * medium
 * 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
 * 输入：root = [1,null,2,3]
 * 输出：[1,2,3]
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
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
var preorderTraversal = function(root) {
  // 递归 dfs 前序遍历 没什么好说的了
  let res = []
  function traversal(node) {
    if(!node) return
    res.push(node.val)
    traversal(node.left)
    traversal(node.right)
  }
  traversal(root)
  return res
};

var preorderTraversal = function(root) {
  // 迭代 dfs 栈
  let stack = [root], res = []
  while(stack.length) {
    // 栈顶出栈
    let node = stack.pop()
    res.push(node.val)
    // 右节点先压栈
    // 这样的话，下一轮迭代左节点会先出栈
    if(node.right) stack.push(node.right)
    if(node.left) stack.push(node.left)
  }
  return res
}