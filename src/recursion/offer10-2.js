/**
 * 剑指 Offer 10- II. 青蛙跳台阶问题
 * easy
 * 一只青蛙一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个 n 级的台阶总共有多少种跳法。
 * 答案需要取模 1e9+7（1000000007），如计算初始结果为：1000000008，请返回 1。
 * 
 * 示例 1：
 * 输入：n = 2
 * 输出：2
 * 
 * 示例 2：
 * 输入：n = 7
 * 输出：21
 * 
 * 示例 3：
 * 输入：n = 0
 * 输出：1
 * 提示：
 * 
 * 0 <= n <= 100
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/qing-wa-tiao-tai-jie-wen-ti-lcof
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number} n
 * @return {number}
 */
var numWays = function(n) {
  // dp
  // 青蛙跳台阶就是斐波那契数列
  // dp[i]分解：
  // 分解成最后一步是跳1格还是2格，
  // 如果最后一步跳1格，那么就是dp[i-1]
  // 如果最后一步跳2格，那么就是dp[i-2]
  // 所以dp[i] = dp[i-1] + dp[i-2]
  let dp = Array(n+1).fill(0)
  dp[0] = 1
  dp[1] = 1
  dp[2] = 2
  let i = 3
  while(i<=n+1){
    dp[i] = (dp[i-1] + dp[i-2]) % (1e9+7)
    i++
  }
  return dp[n]
};