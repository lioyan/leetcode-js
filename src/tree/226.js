/**
 * 226. 翻转二叉树
 * easy
 * 翻转一棵二叉树。
 * 示例：
 * 输入：
 *      4
 *    /   \
 *   2     7
 *  / \   / \
 * 1   3 6   9
 * 输出：
 *      4
 *    /   \
 *   7     2
 *  / \   / \
 * 9   6 3   1

 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/invert-binary-tree
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
var invertTree = function(root) {
  // 递归 dfs
  // 对比翻转前后的树可以发现：每个节点的子树节点值是不变的，只是顺序互换
  // 例如示例中的树，节点7下面的9和6，反转前后均还在7下面
  function traversal(node) {
    if(!node) return node
    let left = node.left, right = node.right
    // 左节点换成有节点
    node.left = right ? traversal(right) : null
    // 右节点换成左节点
    node.right = left ? traversal(left) : null
    return node
  }
  return traversal(root)
};

var invertTree = function(root) {
  // 递归 简化版
  if(!root) return root
  let left = root.left, right = root.right
  root.left = invertTree(right)
  root.right = invertTree(left)
  return root
}

var invertTree = function(root) {
  // 迭代 bfs 队列
  // 1，队列中的节点出队
  // 2，节点的左右子树交换
  // 3，交换后的右左子树进队
  // 4，依次执行
  if(!root) return root
  let queue = [root]
  while(queue.length) {
    let node = queue.shift(); // 此行一定要加分号！
    // 不加分号的话，和下行的es6语法结合会报错
    [node.left, node.right] = [node.right, node.left]
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
  }
  return root
}