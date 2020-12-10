/**
 * 面试题 17.12. BiNode
 * easy
 * 二叉树数据结构TreeNode可用来表示单向链表（其中left置空，right为下一个链表节点）。
 * 实现一个方法，把二叉搜索树转换为单向链表，要求依然符合二叉搜索树的性质，转换操作应是原址的，也就是在原始的二叉搜索树上直接修改。
 * 返回转换后的单向链表的头节点。
 *
 * 注意：本题相对原题稍作改动
 *
 * 示例：
 * 输入： [4,2,5,1,3,null,6,0]
 * 输出： [0,null,1,null,2,null,3,null,4,null,5,null,6]
 *
 * 提示：
 * 节点数量不会超过 100000。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/binode-lcci
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
 * @return {TreeNode}
 */
var convertBiNode = function (root) {
  // 中序遍历
  let prev = null; // 记录上一个节点
  let newRoot = null; // 新的根节点
  function recursive(node) {
    if (!node) return;
    recursive(node.left);
    if (prev === null) { // prev为null，左下的末级节点
      prev = node; // 记录为prev
      newRoot = node; // 也就是新的根节点
    } else { // 正常的遍历
      prev.right = node; // 上个节点的right指向当前
      prev = node; // 当前记录为上一个
      node.left = null; // 当前节点的左树指为null
    }
    recursive(node.right);
  }
  recursive(root);
  return newRoot; // 新的根节点
};
