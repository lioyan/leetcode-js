/**
 * 395. 至少有K个重复字符的最长子串
 * medium
 * 找到给定字符串（由小写字符组成）中的最长子串 T ， 要求 T 中的每一字符出现次数都不少于 k 。输出 T 的长度。
 *
 * 示例 1:
 * 输入:
 * s = "aaabb", k = 3
 * 输出:
 * 3
 * 最长子串为 "aaa" ，其中 'a' 重复了 3 次。
 *
 * 示例 2:
 * 输入:
 * s = "ababbc", k = 2
 * 输出:
 * 5
 * 最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/longest-substring-with-at-least-k-repeating-characters
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubstring = function (s, k) {
  // 递归 分治
  // 分治：找到不满足条件的字符，递归字符左右两边
  s = s.split("");
  let max = 0;
  // 递归方程
  function recursive(arr) {
    if (!arr.length || arr.length < k) return;
    let index = findX(arr);
    if (!index.length) { // 字符都满足条件
      max = Math.max(max, arr.length);
    } else { // 有不满足条件的字符
      recursive(arr.slice(0, index[0]));
      recursive(arr.slice(index[index.length - 1] + 1, arr.length));
      let i = 1;
      while (i < index.length) {
        recursive(arr.slice(index[i - 1] + 1, index[i]));
        i++;
      }
    }
  }
  // 找到当前字符串中出现次数不满足k的字符集合
  function findX(arr) {
    let i = 0,
      maps = {};
    let index = [];
    while (i < arr.length) {
      if (maps[arr[i]]) {
        maps[arr[i]].val++;
        maps[arr[i]].index.push(i);
      } else {
        maps[arr[i]] = { index: [i], val: 1 };
      }
      i++;
    }
    for (let j in maps) {
      if (maps[j].val < k) index.push(...maps[j].index);
    }
    return index;
  }
  recursive(s);
  return max;
};

var longestSubstring = function (s, k) {
  // TODO: 滑动窗口解法
}
const s = '"aaabb',
  k = 3;
console.log(longestSubstring(s, k));
