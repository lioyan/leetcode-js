/**
 * 1137. 第 N 个泰波那契数
 * easy
 * 泰波那契序列 Tn 定义如下：
 * T0 = 0, T1 = 1, T2 = 1, 且在 n >= 0 的条件下 Tn+3 = Tn + Tn+1 + Tn+2
 * 给你整数 n，请返回第 n 个泰波那契数 Tn 的值。
 *
 * 示例 1：
 * 输入：n = 4
 * 输出：4
 * 解释：
 * T_3 = 0 + 1 + 1 = 2
 * T_4 = 1 + 1 + 2 = 4
 *
 * 示例 2：
 * 输入：n = 25
 * 输出：1389537
 *
 * 提示：
 * 0 <= n <= 37
 * 答案保证是一个 32 位整数，即 answer <= 2^31 - 1。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/n-th-tribonacci-number
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
  // dp
  let dp = Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 1;
  let i = 3;
  while (i <= n) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
    i++;
  }
  return dp[n];
};

var tribonacci = function (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 1;
  let n0 = 0,
    n1 = 1,
    n2 = 1,
    n3;
  let i = 3;
  while (i <= n) {
    n3 = n0 + n1 + n2;
    n0 = n1;
    n1 = n2;
    n2 = n3;
    i++
  }
  return n3;
};
