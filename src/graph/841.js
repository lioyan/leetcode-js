/**
 * 841. 钥匙和房间
 * medium
 * 有 N 个房间，开始时你位于 0 号房间。每个房间有不同的号码：0，1，2，...，N-1，并且房间里可能有一些钥匙能使你进入下一个房间。
 * 在形式上，对于每个房间 i 都有一个钥匙列表 rooms[i]，每个钥匙 rooms[i][j] 由 [0,1，...，N-1] 中的一个整数表示，其中 N = rooms.length。 钥匙 rooms[i][j] = v 可以打开编号为 v 的房间。
 * 最初，除 0 号房间外的其余所有房间都被锁住。
 * 你可以自由地在房间之间来回走动。
 * 如果能进入每个房间返回 true，否则返回 false。
 * 示例 1：
 * 输入: [[1],[2],[3],[]]
 * 输出: true
 * 解释:  
 * 我们从 0 号房间开始，拿到钥匙 1。
 * 之后我们去 1 号房间，拿到钥匙 2。
 * 然后我们去 2 号房间，拿到钥匙 3。
 * 最后我们去了 3 号房间。
 * 由于我们能够进入每个房间，我们返回 true。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/keys-and-rooms
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
  // 递归 有向图，判断是否有完整路径
  // 需要辅助结构opens，记录已开的房间
  let res = false
  // opens 记录开过的房间
  function dfs(room, opens) {
    if(opens.indexOf(room) > -1) {
      // 如果当前房间已经开过，跳过该房间的遍历过程
      return
    }
    opens.push(room)
    if(opens.length === rooms.length) {
      // 如果所有房间都被开过，记录结果为true
      res = true
      return
    }
    for(let i = 0; i < rooms[room].length; i++) {
      // 深度搜索当前房间可以开的房间
      dfs(rooms[room][i], opens)
    }
  }
  dfs(0, opens = []) // 从第一个房间开始搜索
  return res
};

var canVisitAllRooms = function(rooms) {
  // 迭代 bfs 队列
  // 需要辅助结构opens，记录已开过的房间
  let opens = [], queue = [0]
  while(queue.length) {
    let room = queue.shift()
    if(opens.indexOf(room) > -1) continue
    opens.push(room)
    for(let i = 0; i < rooms[room].length; i++) {
      if(opens.indexOf(rooms[room][i]) < 0) {
        queue.push(rooms[room][i])
      }
    }
  }
  return opens.length === rooms.length
}