/**
 * 53. 最大子序和
 * easy
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:
输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。

进阶:
如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/maximum-subarray
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  // dp
  let l = nums.length
  if(!l) return 0
  let dp = Array(l).fill(0) // dp数组为包含当前元素的相对最大值
  let max = nums[0] // 单独记录最大值
  dp[0] = nums[0]
  let i = 1
  while(i < l) {
    dp[i] = dp[i-1] < 0 ? nums[i] : dp[i-1] + nums[i] // dp[i-1]小于0，那么dp[i]等于nums[i]
    max = Math.max(max, dp[i]) // 记录历史最大值
    i++
  }
  return max
};

let nums = [-2,1,-3,4,-1,2,1,-5,4]
console.log(maxSubArray(nums))