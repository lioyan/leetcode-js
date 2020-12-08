/**
 * 剑指 Offer 07. 重建二叉树
 * medium
 * 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。
 * 
 * 例如，给出
 * 前序遍历 preorder = [3,9,20,15,7]
 * 中序遍历 inorder = [9,3,15,20,7]
 * 返回如下的二叉树：
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *  
 * 限制：
 * 0 <= 节点个数 <= 5000
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  // 递归 分治思想
  // 拆分左树，右树
  // preorder其实是[根元素,左树结果,右树结果]
  // inorder其实是[左树结果,根元素,右树结果]
  if(!preorder.length) return null // 此时为末级节点
  let root = new TreeNode(preorder[0]) // 前序遍历结果的第一个元素为根节点
  let i = 0
  while(inorder[i] !== preorder[0]) i++ // 找到根节点在中序遍历结果的位置
  // 此时拿到i，可以根据i的位置
  // 把中序遍历结果拆分，[0,i]为左树的结果，i为根元素，[i+1,inorder.length]为右树的结果
  // 把前序遍历结果拆分，第0个元素为根元素，[1，i+1]为左树的结果，[i+1, preorder.length]为右树的结果
  root.left = buildTree(preorder.slice(1,i+1), inorder.slice(0,i)) // 递归左树
  root.right = buildTree(preorder.slice(i+1, preorder.length), inorder.slice(i+1,inorder.length)) // 递归右树
  return root // 返回根节点
};