/**
 * 剑指 Offer 16. 数值的整数次方
 * medium
 * 实现函数double Power(double base, int exponent)，求base的exponent次方。不得使用库函数，同时不需要考虑大数问题。
 *
 * 示例 1:
 * 输入: 2.00000, 10
 * 输出: 1024.00000
 *
 * 示例 2:
 * 输入: 2.10000, 3
 * 输出: 9.26100
 *
 * 示例 3:
 * 输入: 2.00000, -2
 * 输出: 0.25000
 * 解释: 2-2 = 1/22 = 1/4 = 0.25
 *
 * 说明:
 * -100.0 < x < 100.0
 * n 是 32 位有符号整数，其数值范围是 [−231, 231 − 1] 。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/shu-zhi-de-zheng-shu-ci-fang-lcof
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function (x, n) {
  // 分治
  if(x === 0) return 0
  // 处理负数
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  function recursive(x, n) {
    if (n === 0) return 1;
    let mid = n >>> 1; // 无符号右移
    // >>为有符号右移，超出32位的数字右移会变成负数，例如2147483648 >> 1 = -1073741824
    // >>>可以去掉正负号
    let last = n & 1; // 按位与，n的二进制末位为1时返回true，即奇数为true
    return last ? recursive(x * x, mid) * x : recursive(x * x, mid); // 二分，时间复杂度logN
  }
  return recursive(x, n);
};
let x = 2.00000
let n = 2147483648
console.log(myPow(x, n));
