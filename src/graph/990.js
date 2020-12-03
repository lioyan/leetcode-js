/**
 * 990. 等式方程的可满足性
 * medium
 * 
 * 给定一个由表示变量之间关系的字符串方程组成的数组，
 * 每个字符串方程 equations[i] 的长度为 4，
 * 并采用两种不同的形式之一："a==b" 或 "a!=b"。
 * 在这里，a 和 b 是小写字母（不一定不同），表示单字母变量名。
 * 只有当可以将整数分配给变量名，以便满足所有给定的方程时才返回 true，否则返回 false。 
 * 
 * 示例 1：
 * 输入：["a==b","b!=a"]
 * 输出：false
 * 解释：如果我们指定，a = 1 且 b = 1，那么可以满足第一个方程，但无法满足第二个方程。没有办法分配变量同时满足这两个方程。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/satisfiability-of-equality-equations
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string[]} equations
 * @return {boolean}
 */
var equationsPossible = function(equations) {
  // 并查集
  let parents = {} // 每个节点的root表
  let rank = {} // 高度表,用于路径压缩
  for(let i = 0; i < equations.length; i++) {
    // 初始parents和rank
    let x = equations[i][0], y = equations[i][3]
    parents[x] = 0 // 初始值为0，表示节点为独立节点，没有父节点
    parents[y] = 0
    rank[x] = 0 // 初始值为0，表示节点的树的高度为0
    rank[y] = 0
  }
  function findRoot(node) {
    // 查找node节点的根节点
    let root = node
    while(parents[root]) {
      root = parents[root]
    }
    return root
  }
  function union(x,y) {
    // 合并x树和y树，即合并xy的根
    let x_root = findRoot(x) // x的根
    let y_root = findRoot(y) // y的根
    if(x_root !== y_root) {
      // 路径压缩优化，判断x_root树和y_root树高度
      // 高度小的树合并到高度大的树
      // 保持合并后的树高度不会增加
      if(rank[x_root] > rank[y_root]) {
        parents[y_root] = x_root
      } else if(rank[x_root] < rank[y_root]) {
        parents[x_root] = y_root
      } else {
        parents[x_root] = y_root
        rank[x_root] += 1
      }
    }
  }
  for(let i = 0; i < equations.length; i++) {
    // 合并相等式的字母
    let x = equations[i][0], y = equations[i][3]
    if(equations[i][1] === '=') {
      union(x,y)
    }
  }
  for(let i = 0; i < equations.length; i++) {
    // 判断不等式的两个字母是否在同一个树上，
    // 是的话，返回不成立
    if(equations[i][1] === '!' && findRoot(equations[i][0]) === findRoot(equations[i][3]))  return false
  }
  return true
};