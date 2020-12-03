/**
 * 1162. 地图分析
 * medium
 * 你现在手里有一份大小为 N x N 的 网格 grid，上面的每个 单元格 都用 0 和 1 标记好了。
 * 其中 0 代表海洋，1 代表陆地，请你找出一个海洋单元格，这个海洋单元格到离它最近的陆地单元格的距离是最大的。
 * 我们这里说的距离是「曼哈顿距离」（ Manhattan Distance）：(x0, y0) 和 (x1, y1) 这两个单元格之间的距离是 |x0 - x1| + |y0 - y1| 。
 * 如果网格上只有陆地或者海洋，请返回 -1。
 * 示例 1：
 *   1  0  1
 *   0  0  0
 *   1  0  1
 * 输入：[[1,0,1],[0,0,0],[1,0,1]]
 * 输出：2
 * 解释： 
 * 海洋单元格 (1, 1) 和所有陆地单元格之间的距离都达到最大，最大距离为 2。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/as-far-from-land-as-possible
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[][]} grid
 * @return {number}
 */
var maxDistance = function(grid) {
  // 递归
  let res = -1,
    n = grid.length, // 行数
    m = grid[0].length // 列数
  function recursive(lands, total) {
    // 递归函数，lands陆地点向四周上下左右各扩散一格，
    // 判断扩散后的四个点是否在grid范围内，且是海洋
    // 条件成立的话，距离+1，扩散的点标记为陆地，后续递归跳过这些标记点
    if(!lands.length || lands.length === n * m) return
    let distance = [[-1,0], [0,1], [1,0], [0,-1]] // 上下左右各移动一格的偏差量,[i,j]
    let newLands = [] // 下一批路地点
    for(let j = 0; j < lands.length; j++) {
      let point = lands[j]
      for(let i = 0; i < distance.length; i++) {
        let x = point[0] + distance[i][0]
        let y = point[1] + distance[i][1]
        if(x >= 0 && x <= n-1 && y >= 0 && y <= m - 1 && grid[x][y] === 0 ) {
          // 判断扩散后的四个点是否在grid范围内，且是海洋
          // 条件成立的话，距离+1，扩散的点标记为陆地，后续递归跳过这些标记点
          res = Math.max(res, total+1) // 符合条件，距离total+1
          grid[x][y] = 1 // 海洋变陆地，将该点放入下一批递归的陆地点
          newLands.push([x,y])
        }
      }
    }
    recursive(newLands, total + 1)
  }
  let initlands = [] // 初始陆地
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(grid[i][j] === 1) initlands.push([i,j])
    }
  }
  // 递归的核心逻辑：每次递归同时处理同一批陆地，total+1，陆地批次即距离
  // 即 多源同时扩散
  // 而不是递归每个路地点，如此的话，有多少个海洋点，距离就是几，这是错误的。
  recursive(initlands,0)
  return res
};

var maxDistance = function(grid) {
  // 迭代 队列
  let queue = [], res = -1
  let n = grid.length,
    m = grid[0].length
  // 采集初始的陆地点
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      if(grid[i][j] === 1) queue.push([i,j])
    }
  }
  // 全部是海洋或者全部是陆地，返回-1
  if(!queue.length || queue.length === n * m) return -1
  let distance = [[-1,0], [0,1], [1,0], [0,-1]] // 四个方向的偏移量
  while(queue.length) {
    // 同一批陆地会遍历完后全部出队
    // 所以这层遍历的遍历次数即有多少批陆地，就是距离 res
    res += 1
    let l = queue.length
    while(l>0) {
      // 同一批陆地全部出队，下一批陆地全部进队
      let point = queue.shift()
      for(let i = 0; i < distance.length; i++) {
        let x = point[0] + distance[i][0]
        let y = point[1] + distance[i][1]
        if(x >= 0 && x < n && y >= 0 && y < m && grid[x][y] === 0) {
          grid[x][y] = 1
          queue.push([x,y])
        }
      }
      l--
    }
  }
  return res
}

const grid = [[1,0,0],[0,0,0],[0,0,0]]
console.log(maxDistance(grid))