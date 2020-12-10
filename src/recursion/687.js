/**
 * 687. 最长同值路径
 * medium
 * 给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。
 * 注意：两个节点之间的路径长度由它们之间的边数表示。
 *
 * 示例 1:
 * 输入:
 *               5
 *              / \
 *             4   5
 *            / \   \
 *           1   1   5
 * 输出:
 * 2
 *
 * 示例 2:
 * 输入:
 *               1
 *              / \
 *             4   5
 *            / \   \
 *           4   4   5
 * 输出:
 * 2
 *
 * 注意: 给定的二叉树不超过10000个结点。 树的高度不超过1000。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/longest-univalue-path
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
 * @return {number}
 */
var longestUnivaluePath = function (root) {
  // 递归 后续遍历
  let max = 0; // 记录最长路径
  function recursive(node) {
    if (!node) return 0; // 末级节点路径为0
    let left = recursive(node.left); // 左子树的最长路径
    let right = recursive(node.right); // 右子树的最长路径
    let currLeft = 0, // 当前节点的左路径，初始0
      currRight = 0; // 当前节点的右路径，初始0
    if (node.left && node.left.val === node.val) currLeft = left + 1; // 如果左节点和当前节点相同，当前节点的左路径为左子树的最长路径+1
    if (node.right && node.right.val === node.val) currRight = right + 1; // 如果右节点和当前节点相同，当前节点的右路径为右子树的最长路径+1
    max = Math.max(max, currLeft + currRight); // 判断最大的完整路径
    return Math.max(currLeft, currRight); // 当前节点返回最长的一条子路径
  }
  recursive(root);
  return max;
};
