/**
 * 684. 冗余连接
 * medium
 * 在本问题中, 树指的是一个连通且无环的无向图。
 * 输入一个图，该图由一个有着N个节点 (节点值不重复1, 2, ..., N) 的树及一条附加的边构成。
 * 附加的边的两个顶点包含在1到N中间，这条附加的边不属于树中已存在的边。
 * 结果图是一个以边组成的二维数组。每一个边的元素是一对[u, v] ，满足 u < v，表示连接顶点u 和v的无向图的边。
 * 返回一条可以删去的边，使得结果图是一个有着N个节点的树。如果有多个答案，则返回二维数组中最后出现的边。
 * 答案边 [u, v] 应满足相同的格式 u < v。
 * 
 * 示例 1：
 * 输入: [[1,2], [1,3], [2,3]]
 * 输出: [2,3]
 * 解释: 给定的无向图为:
 *   1
 *  / \
 * 2 - 3
 * 
 * 示例 2：
 * 输入: [[1,2], [2,3], [3,4], [1,4], [1,5]]
 * 输出: [1,4]
 * 解释: 给定的无向图为:
 * 5 - 1 - 2
 *     |   |
 *     4 - 3
 * 
 * 注意:
 * 输入的二维数组大小在 3 到 1000。
 * 二维数组中的整数在1到N之间，其中N是输入数组的大小。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/redundant-connection
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
  // 并查集, 查找是否有环，返回属于环的最后一条边
  let res = [] // 符合条件的边集合
  let parents = Array(edges.length+1).fill(0) // 每个节点的父节点表，默认值0，表示独立节点
  function findRoot(node) {
    // 寻找节点node的根节点
      let root_node = node
      while(parents[root_node]) {
          root_node = parents[root_node]
      }
      return root_node
  }
  function union(x,y) {
    // 合并节点树
      let x_root = findRoot(x)
      let y_root = findRoot(y)
      if(x_root !== y_root){
        // 如果x的根节点和y的根节点不属于一棵树，那么合并这两个树
          parents[x_root] = y_root
      }else return true // 如果x的根节点和y的根节点相同，那么x,y属于同一棵树，即有环，返回true，用于下面的判断
  }
  for(let i = 0; i < edges.length; i++) {
    // 遍历所有边
      let [x,y] = edges[i]
      // 合并节点
      if(union(x,y)) res.unshift(edges[i]) // 如果找到环，那么把边放入res第一位
  }
  return res.length ? res[0] : [] // 返回res的第一个元素，即最后出现的环边
};