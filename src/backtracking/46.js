/**
 * 46. 全排列
 * medium
给定一个 没有重复 数字的序列，返回其所有可能的全排列。

示例:
输入: [1,2,3]
输出:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  // 回溯
  let n = nums.length
  let res = []
  function backtracking(count, arr) {
    if(count === n) {
      res.push([...arr])
      return
    }
    for(let i = 0; i < nums.length; i++) {
      // 每次都遍历完整的nums，因为用了后面的元素，前面的元素也可以用
      if(arr.indexOf(nums[i]) < 0) { // 这里排除重复的元素
        arr.push(nums[i])
        backtracking(count+1, arr)
        arr.pop(nums[i])
      }
    }
  }
  backtracking(0,[])
  return res
};
let nums = [1,2,3]
console.log(permute(nums))