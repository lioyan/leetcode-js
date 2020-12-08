/**
 * 783. 二叉搜索树节点最小距离
 * easy
 * 给定一个二叉搜索树的根节点 root，返回树中任意两节点的差的最小值。
 *
 * 示例：
 * 输入: root = [4,2,6,1,3,null,null]
 * 输出: 1
 * 解释:
 * 注意，root是树节点对象(TreeNode object)，而不是数组。
 * 给定的树 [4,2,6,1,3,null,null] 可表示为下图:
 *           4
 *         /   \
 *       2      6
 *      / \
 *     1   3
 * 最小的差值是 1, 它是节点1和节点2的差值, 也是节点3和节点2的差值。
 *
 * 注意：
 * 二叉树的大小范围在 2 到 100。
 * 二叉树总是有效的，每个节点的值都是整数，且不重复。
 * 本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/ 相同
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes
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
 * @return {number}
 */
var minDiffInBST = function (root) {
  // root为二叉搜索树，中序遍历即从小到大的顺序，最小差值存在在相邻节点的差值
  let min = Infinity; // 最小值
  let prev; // 保存上一个节点的值
  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    if (prev === undefined) {
      prev = node.val; // 记录第一个节点的值
    } else {
      min = Math.min(min, node.val - prev); // 当前节点与上一个节点的差值
      prev = node.val; // 更新prev
    }
    dfs(node.right);
  }
  dfs(root);
  return min; // 返回min
};
