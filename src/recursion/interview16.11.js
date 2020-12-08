/**
 * 面试题 16.11. 跳水板
 * easy
 * 你正在使用一堆木板建造跳水板。有两种类型的木板，
 * 其中长度较短的木板长度为shorter，长度较长的木板长度为longer。
 * 你必须正好使用k块木板。编写一个方法，生成跳水板所有可能的长度。
 * 返回的长度需要从小到大排列。
 *
 * 示例 1
 * 输入：
 * shorter = 1
 * longer = 2
 * k = 3
 * 输出： [3,4,5,6]
 * 解释：
 * 可以使用 3 次 shorter，得到结果 3；使用 2 次 shorter 和 1 次 longer，得到结果 4 。以此类推，得到最终结果。
 * 提示：
 *
 * 0 < shorter <= longer
 * 0 <= k <= 100000
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/diving-board-lcci
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} shorter
 * @param {number} longer
 * @param {number} k
 * @return {number[]}
 */
var divingBoard = function (shorter, longer, k) {
  // 数学推导
  // 假设k块木板全部使用shorter为res[0]
  // shorter数量-1，longer数量+1，为res[1]
  // 依次类推，直到k块木板全部为longer，即res[k]
  // 所以共有k+1种可能
  if (k === 0) return [];
  let res = [shorter * k];
  if (shorter === longer) return res;
  let i = 1;
  while (i < k + 1) {
    res[i] = shorter * (k - i) + longer * i;
    i++;
  }
  return res;
};

var divingBoard = function (shorter, longer, k) {
  // 递归
  if (k === 0) return [];
  if (shorter === longer) return [shorter * k];
  let res = [];
  function recursive(n) {
    if (n < 0) return;
    res.push(shorter * n + longer * (k - n));
    recursive(n - 1);
  }
  recursive(k);
  return res;
};
