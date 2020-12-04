/**
 * 332. 重新安排行程
 * medium
 * 给定一个机票的字符串二维数组 [from, to]，
 * 子数组中的两个成员分别表示飞机出发和降落的机场地点，对该行程进行重新规划排序。
 * 所有这些机票都属于一个从 JFK（肯尼迪国际机场）出发的先生，所以该行程必须从 JFK 开始。
 * 提示：
 * 如果存在多种有效的行程，请你按字符自然排序返回最小的行程组合。
 * 例如，行程 ["JFK", "LGA"] 与 ["JFK", "LGB"] 相比就更小，排序更靠前
 * 所有的机场都用三个大写字母表示（机场代码）。
 * 假定所有机票至少存在一种合理的行程。
 * 所有的机票必须都用一次 且 只能用一次。
 * 
 * 示例 1：
 * 输入：[["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
 * 输出：["JFK", "MUC", "LHR", "SFO", "SJC"]
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/reconstruct-itinerary
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string[][]} tickets
 * @return {string[]}
 */
var findItinerary = function(tickets) {
  // dfs 回溯
  let res = [] // result
  let list = {} // 邻接表
  for(let i = 0; i < tickets.length; i++) {
    // 收集邻接表
    let from = tickets[i][0], to = tickets[i][1]
    if(list[from]) {
      let i = 0
      while(list[from][i] < to) i++ // 对节点进行字母排序
      list[from].splice(i, 0, to)
    }else {
      list[from] = [to]
    }
  }
  function dfs(node, count) { // count记录使用了多少张票
    if(tickets.length === count) return true // 票用完了返回true
    let neighbor = list[node] // 邻接节点
    if(!neighbor || neighbor.length === 0) return false // 邻接节点为空（票还没用完），此路不通，返回false
    for(let i = 0; i < neighbor.length; i++) {
      const next = neighbor[i] // 先暂存这个节点
      res.push(next) // 尝试放入res
      neighbor.splice(i,1) // 在邻接表中删除这个节点（因为票只能用一次）
      if(dfs(next, count+1)) { // 判断，如果这个节点dfs返回true，说明此路可行
        return true // 返回true，继续
      }else { // 返回false，说明这条路不通
        neighbor.splice(i,0, next) // 邻接表中回复暂存起来的节点
        res.pop() // res里删除这个节点
      } // 回溯法，就是逐个dfs尝试，能走到底就返回。走到一半走不通，就回到上一步，dfs相邻的节点，继续dfs。如此重复，找到一条完整的路径。
        // 因为我们在收集邻接表操作的时候排过序了，所以结果是排序最小的可行路径
    }
  }
  res.push('JFK')
  dfs('JFK', 0)
  return res
};
var findItinerary = function(tickets) {
  const res = [];
  const map = {};
  
  for (const ticket of tickets) { // 建表
    const [from, to] = ticket;
    if (!map[from]) {
      map[from] = [];
    }
    map[from].push(to);
  }
  for (const city in map) {
    map[city].sort();
  }

  const dfs = (node) => { // 当前城市
    const nextNodes = map[node]; // 当前城市的邻接城市
    while (nextNodes && nextNodes.length) { // 遍历，一次迭代设置一个递归分支
      const next = nextNodes.shift(); // 获取并移除第一项，字母小的城市
      dfs(next);                      // 向下递归
    }                 
    // 当前城市没有下一站，就把他加到res里，递归开始向上返回，选过的城市一个个推入res 
    res.unshift(node); 
  };

  dfs('JFK'); // 起点城市
  return res;
}
let tickets = [["MUC", "LHR"], ["JFK", "MUC"], ["SFO", "SJC"], ["LHR", "SFO"]]
tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
tickets = [["JFK","KUL"],["JFK","NRT"],["NRT","JFK"]]
console.log(findItinerary(tickets))