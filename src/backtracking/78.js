/**
 * 78. 子集
 * medium
给定一组不含重复元素的整数数组 nums，返回该数组所有可能的子集（幂集）。

说明：解集不能包含重复的子集。

示例:
输入: nums = [1,2,3]
输出:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/subsets
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  // 回溯
  let res = []
  function backtracking(index,arr) {
    if(index > nums.length) { // index到最后一个元素就结束
      return
    }
    res.push([...arr]) // 放入子集，第一次放的是空数组[]
    for(let i = index; i < nums.length; i++) {
      arr.push(nums[i])
      backtracking(i+1,arr) // index传i+1，即每次都只取后面的元素，这样不会重复，且都为子集
      arr.pop()
    }
  }
  backtracking(0,[])
  return res
};
let nums = [1,2,3]
console.log(subsets(nums))