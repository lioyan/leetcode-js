/**
 * 997. 找到小镇的法官
 * easy
 * 在一个小镇里，按从 1 到 N 标记了 N 个人。传言称，这些人中有一个是小镇上的秘密法官。
 * 如果小镇的法官真的存在，那么：
 * 
 * 小镇的法官不相信任何人。
 * 每个人（除了小镇法官外）都信任小镇的法官。
 * 只有一个人同时满足属性 1 和属性 2 。
 * 给定数组 trust，该数组由信任对 trust[i] = [a, b] 组成，表示标记为 a 的人信任标记为 b 的人。
 * 
 * 如果小镇存在秘密法官并且可以确定他的身份，请返回该法官的标记。否则，返回 -1。
 * 
 * 示例 1：
 * 输入：N = 2, trust = [[1,2]]
 * 输出：2
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/find-the-town-judge
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number} N
 * @param {number[][]} trust
 * @return {number}
 */
var findJudge = function(N, trust) {
  // 有向图
  // 法官的条件，入度为N-1，出度为0
  let degree = Array.from(Array(N+1), () => Array(2).fill(0)) // index = 0为入度，1为出度
  for(let i = 0; i < trust.length; i++) {
    // 收集入度和出度
      let [x,y] = trust[i]
      degree[x][1]++
      degree[y][0]++
  }
  for(let i = 1; i < degree.length; i++) {
      let [x,y] = degree[i]
      if(x === N - 1 && y === 0) return i // 入度为N-1，出度为0，这个人就是法官
  }
  return -1
};