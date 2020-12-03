/**
 * 133. 克隆图
 * medium
 * 给你无向 连通 图中一个节点的引用，请你返回该图的 深拷贝（克隆）。
 * 图中的每个节点都包含它的值 val（int） 和其邻居的列表（list[Node]）。
 * 
 * class Node {
 *     public int val;
 *     public List<Node> neighbors;
 * }
 * 
 * 测试用例格式：
 * 简单起见，每个节点的值都和它的索引相同。例如，第一个节点值为 1（val = 1），第二个节点值为 2（val = 2），以此类推。该图在测试用例中使用邻接列表表示。
 * 邻接列表 是用于表示有限图的无序列表的集合。每个列表都描述了图中节点的邻居集。
 * 给定节点将始终是图中的第一个节点（值为 1）。你必须将 给定节点的拷贝 作为对克隆图的引用返回。
 * 
 * 输入：adjList = [[2,4],[1,3],[2,4],[1,3]]
 * 输出：[[2,4],[1,3],[2,4],[1,3]]
 * 解释：
 * 图中有 4 个节点。
 * 节点 1 的值是 1，它有两个邻居：节点 2 和 4 。
 * 节点 2 的值是 2，它有两个邻居：节点 1 和 3 。
 * 节点 3 的值是 3，它有两个邻居：节点 2 和 4 。
 * 节点 4 的值是 4，它有两个邻居：节点 1 和 3 。

 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/clone-graph
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {
  //递归 dfs
  let maps = new Map() // 记录克隆的节点，key为原节点，value为克隆节点
  function recursive(curr) {
    if(curr == null) return curr
    if(maps.has(curr)) return maps.get(curr)
    let newNode = new Node(curr.val)
    maps.set(curr, newNode) // 注意！set方法一定要在52行递归前面执行，不然无限递归
    newNode.neighbors = curr.neighbors.map(n => recursive(n))
    return newNode
  }
  return recursive(node)
};

var cloneGraph = function(node) {
  // 迭代 bfs 队列
  // Map保存原节点和克隆节点的关系
  if(node == null) return node
  let maps = new Map(), queue = [node]
  maps.set(node, new Node(node.val))
  while(queue.length) {
    let curr = queue.shift()
    for(let i = 0; i < curr.neighbors.length; i++) {
      if(!maps.has(curr.neighbors[i])){
        maps.set(curr.neighbors[i], new Node(curr.neighbors[i].val))
        queue.push(curr.neighbors[i])
      }
      maps.get(curr).neighbors.push(maps.get(curr.neighbors[i]))
    }
  }
  return maps.get(node)
}