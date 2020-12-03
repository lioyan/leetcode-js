/**
 * 785. 判断二分图
 * medium
 * 给定一个无向图graph，当这个图为二分图时返回true。
 * 如果我们能将一个图的节点集合分割成两个独立的子集A和B，并使图中的每一条边的两个节点一个来自A集合，一个来自B集合，我们就将这个图称为二分图。
 * graph将会以邻接表方式给出，graph[i]表示图中与节点i相连的所有节点。每个节点都是一个在0到graph.length-1之间的整数。这图中没有自环和平行边： graph[i] 中不存在i，并且graph[i]中没有重复的值。
 * 
 * 示例 1:
 * 输入: [[1,3], [0,2], [1,3], [0,2]]
 * 输出: true
 * 解释: 
 * 无向图如下:
 * 0----1
 * |    |
 * |    |
 * 3----2
 * 我们可以将节点分成两组: {0, 2} 和 {1, 3}。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/is-graph-bipartite
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
  // dfs 着色法，相邻节点颜色不同条件成立
  //  - 未着色 0 已着色 1 已着色 
  let list = new Array(graph.length).fill(-1)
  let res = true
  function dfs(node, flag) {
    if(list[node] === -1) {
      list[node] = flag
      for(let i = 0; i < graph[node].length; i++) {
        dfs(graph[node][i], flag?0:1, list)
      }
    }else if (list[node] !== flag) {
      res = false
    }
    return
  }
  for(let i = 0; i < graph.length; i++) {
    // 已经着色的节点，跳过dfs
    (list[i] === -1) && dfs(i, 0)
  }
  return res
};

var isBipartite = function(graph) {
  // bfs 着色法
  let colors = Array(graph.length).fill(-1)
  for(let i = 0; i < graph.length; i++) {
    if(colors[i] !== -1) continue // 已经着色的节点，跳过
    let queue = [i]
    colors[i] = 0 // 初始根节点颜色
    while(queue.length) {
      let node = queue.shift()
      for(let j = 0; j < graph[node].length; j++) {
        let curr = graph[node][j]
        if(colors[curr] === colors[node]) return false
        if(colors[curr] === (colors[node] ? 0 : 1)) continue
        colors[curr] = colors[node] ? 0 : 1
        queue.push(curr)
      }
    }
  }
  return true
}