/**
 * 17. 电话号码的字母组合
 * medium
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 * 示例:
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  // 递归
  if (!digits.length) return [];
  let maps = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  let ad = digits.split(""); // 入参转换为数组
  let res = []; // result
  function recursive(arr, str) {
    if (!arr.length) {
      // arr为空时，说明路径走到底了，str放入结果
      res.push(str);
      return;
    }
    let [cur, ...rest] = arr; // 浅拷贝
    for (let i = 0; i < maps[cur].length; i++) {
      // 递归方程，每次arr减少一个元素，拼接str
      recursive(rest, str + maps[cur][i]);
    }
  }
  recursive(ad, ""); // str初始为空字符串
  return res;
};
