/**
 * 207. 课程表
 * medium
 * 你这个学期必须选修 numCourse 门课程，记为 0 到 numCourse-1 。
 * 在选修某些课程之前需要一些先修课程。 例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示他们：[0,1]
 * 给定课程总量以及它们的先决条件，请你判断是否可能完成所有课程的学习？
 * 示例 1:
 * 输入: 2, [[1,0]] 
 * 输出: true
 * 解释: 总共有 2 门课程。学习课程 1 之前，你需要完成课程 0。所以这是可能的。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/course-schedule
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
  // 迭代 根据入度 bfs 队列
  let inDegree = Array(numCourses).fill(0) // 入度表：每个顶点的入度集合，初始入度都为0
  let map = {} // map用来存储顶点的依赖顶点
  for(let i = 0; i < prerequisites.length; i++) {
    inDegree[prerequisites[i][0]]++ // [i][0]即第一个元素的入度+1
    // 收集依赖，value为key顶点指向的顶点集合
    if(map[prerequisites[i][1]]) {
      map[prerequisites[i][1]].push(prerequisites[i][0])
    }else {
      map[prerequisites[i][1]] = [prerequisites[i][0]]
    }
  }
  // 上述代码为准备工作，下面正式开始
  let queue = [], // 队列，初始为空，入度为0的顶点会进队
    res = 0 // 结果：记录数量，如果等于numCourses的话，即成立

  for(let i = 0; i < inDegree.length; i++) {
    // 首先遍历入度表，将入度为0的顶点入队
    if(inDegree[i] === 0) queue.push(i)
  }
  // 遍历队列
  while(queue.length) {
    let curr = queue.shift()
    res ++ // 出队一个顶点，res+1
    if(map[curr] && map[curr].length) {
      for(let i = 0; i < map[curr].length; i++) {
        inDegree[map[curr][i]]-- // 依赖curr的顶点的入度全部-1
        if(inDegree[map[curr][i]] === 0) queue.push(map[curr][i])
      }
    }
  }
  return res === numCourses
};

var canFinish = function(numCourses, prerequisites) {
  // 递归 dfs 判断图中是否有环，有环返回false
  // 递归顶点，判断当前顶点是否存在环
  // flag设置顶点三种状态：-1-已搜过，0-未搜索，1-正在搜索

  //let deps = Array(numCourses).fill([]) // 顶点的前置顶点集合，索引为课程号，值为依赖key的课程
  // 注意！上一行的fill方法填充空数组会报错。因为deps的所有元素会引用同一个空数组
  let deps = Array.from(Array(numCourses), () => [])
  let flag = Array(numCourses).fill(0) // 状态集合，索引为课程号，值初始为0：未搜索
  // 收集邻接条件
  for(let i = 0; i < prerequisites.length; i++) {
    let [curr, pre] = prerequisites[i]
    deps[pre].push(curr)
  }
  // 递归函数
  function dfs(curr, deps, flag) {
    if(flag[curr] === 1) return false // 1：表示当前路径上该顶点第二次出现，即出现了环，不成立
    if(flag[curr] === -1) return true // -1：表示该顶点在之前的路径已经判断过了，满足条件，无须重复判断
    flag[curr] = 1 // 状态置为搜索中
    for(let i = 0; i < deps[curr].length; i++) {
      if(!dfs(deps[curr][i], deps, flag)) return false
    }
    flag[curr] = -1 // 递归出栈，状态依次置为已搜过
    return true
  }
  for(let i = 0; i < numCourses; i++) {
    // 只有dfs返回false时，才提前返回
    // dfs返回true时不能提前返回，因为后续可能有false
    if(!dfs(i, deps, flag)) return false
  }
  return true
}