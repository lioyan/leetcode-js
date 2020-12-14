/**
 * 22. 括号生成
 * medium
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 * 示例：
 * 输入：n = 3
 * 输出：[
 *        "((()))",
 *        "(()())",
 *        "(())()",
 *        "()(())",
 *        "()()()"
 *      ]
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/generate-parentheses
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  // 回溯
  let res = [], // 保存结果
    stack = []; // 栈结构，维护放入的括号
  function tracking(amount, stack, left, right) {
    // 假设'('的值为1，')'的值为-1，amount表示放入栈的括号的和，用来限制左右括号前后顺序
    // 如果amount<0，表示当前右括号数大于左括号数，无效组合，不满足条件。
    // left和right分别限制左括号和右括号数量
    // stack 维护当前的括号组合
    if (left > n || right > n || amount < 0) return;
    if (left === n && right === n && amount === 0) {
      // 括号数量满足n，并且是有效的，拼接字符串放入结果
      res.push(stack.join(""));
      return;
    }
    // 下面是主要逻辑：当前时刻，压入一个左括号 或者 一个右括号
    // 1，压栈一个左括号
    stack.push("(");
    // 递归
    tracking(amount + 1, stack, left + 1, right);
    // 弹出左括号
    stack.pop();
    // 2，压入右括号
    stack.push(")");
    // 递归
    tracking(amount - 1, stack, left, right + 1);
    // 弹出
    stack.pop();
  }
  tracking(0, stack, 0, 0);
  return res;
};
