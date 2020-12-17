/**
 * 40. 组合总和 II
 * medium

给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

candidates 中的每个数字在每个组合中只能使用一次。

说明：
所有数字（包括目标数）都是正整数。
解集不能包含重复的组合。 

示例 1:
输入: candidates = [10,1,2,7,6,1,5], target = 8,
所求解集为:
[
  [1, 7],
  [1, 2, 5],
  [2, 6],
  [1, 1, 6]
]

示例 2:
输入: candidates = [2,5,2,1,2], target = 5,
所求解集为:
[
  [1,2,2],
  [5]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/combination-sum-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  // 回溯
  // 关键点在去重，方法是先排序再剪枝
  let res = []
  candidates.sort((a,b) => a-b) // 排序
  function backtracking(candidates,target,index,arr) {
    let prev = []
    if(target < 0) return
    if(target === 0) {
      res.push([...arr])
      return
    }
    for(let i = index; i < candidates.length; i++) {
      let curr = candidates[i]
      if(prev.indexOf(curr) > -1) continue // 剪枝
      arr.push(curr)
      backtracking(candidates, target - curr, i+1, arr) // index为i+1
      arr.pop()
      prev.push(curr)
    }
  }
  backtracking(candidates, target,0, [])
  return res
};

let candidates = [10,1,2,7,6,1,5]
// candidates = [1,1,2,5,6,7,10]
target = 8

console.log(combinationSum2(candidates, target))