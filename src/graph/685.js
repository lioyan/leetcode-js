/**
 * 685. 冗余连接 II
 * hard
 * 在本问题中，有根树指满足以下条件的有向图。该树只有一个根节点，所有其他节点都是该根节点的后继。每一个节点只有一个父节点，除了根节点没有父节点。
 * 输入一个有向图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
 * 结果图是一个以边组成的二维数组。 每一个边 的元素是一对 [u, v]，用以表示有向图中连接顶点 u 和顶点 v 的边，其中 u 是 v 的一个父节点。
 * 返回一条能删除的边，使得剩下的图是有N个节点的有根树。若有多个答案，返回最后出现在给定二维数组的答案。
 *
 * 示例 1:
 * 输入: [[1,2], [1,3], [2,3]]
 * 输出: [2,3]
 * 解释: 给定的有向图如下:
 *   1
 *  / \
 * v   v
 * 2-->3
 *
 * 示例 2:
 * 输入: [[1,2], [2,3], [3,4], [4,1], [1,5]]
 * 输出: [4,1]
 * 解释: 给定的有向图如下:
 * 5 <- 1 -> 2
 *      ^    |
 *      |    v
 *      4 <- 3
 *
 * 注意:
 * 二维数组大小的在3到1000范围内。
 * 二维数组中的每个整数在1到N之间，其中 N 是二维数组的大小。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/redundant-connection-ii
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantDirectedConnection = function (edges) {
  // 并查集
  // 判断条件根据入度分两种情况
  // 1,所有节点入度都为1，返回环的任意（最后一个）边即可
  // 2,有入度为2的节，此时如果有环，返回指向该节点的边并且此边在环中；如果没有环，返回指向该节点的任意（最后一条）边。
  let res = [];
  let tmp; // 保存临时删掉的边
  let degress = Array(edges.length + 1).fill(0); // 入度表
  let parents = Array(edges.length + 1).fill(0); // 父节点表
  let maybe = []; // 指向入度为2的顶点的边

  for (let i = 0; i < edges.length; i++) {
    degress[edges[i][1]]++;
    if (degress[edges[i][1]] > 1) { // 如果顶点的入度为2
      for (let j = 0; j < edges.length; j++) {
        edges[j][1] === edges[i][1] && maybe.unshift(edges[j]); // 将指向该顶点的边放入maybe
      }
    }
  }
  function findRoot(node) {
    let root_node = node;
    while (parents[root_node]) root_node = parents[root_node];
    return root_node;
  }
  function union(x, y) {
    let x_root = findRoot(x);
    let y_root = findRoot(y);
    if (x_root !== y_root) {
      parents[y] = x;
    } else return true;
  }
  // 存在入度为2
  if (maybe.length) {
    tmp = maybe.shift(); // 假设任意删除一条边
    for (let i = 0; i < edges.length; i++) {
      if (tmp[0] === edges[i][0] && tmp[1] === edges[i][1]) {
        edges.splice(i, 1);
      }
    }
  }
  // 此时for循环遍历的是原始edges或者删除了某条边的edges
  // 如果删除一条边后，没有环了，说明删除的那条边就是要找的边；如果还有环，说明是maybe里的另外一条
  for (let i = 0; i < edges.length; i++) {
    let [x, y] = edges[i];
    if (union(x, y)) {
      // 有环
      if (maybe.length) {
        // 有入度为2的点，此时某条边已被删除，并且还有环，说明删错了边，应该是入度为2的顶点的另一条边，即maybe剩余的边
        return maybe[0];
      }
      // 没有入度为2的点，此时返回环的最后一条边即可
      res.unshift(edges[i]);
    }
  }
  return res.length ? res[0] : tmp;
};
