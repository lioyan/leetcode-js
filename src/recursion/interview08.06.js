/**
 * 面试题 08.06. 汉诺塔问题
 * easy
 * 在经典汉诺塔问题中，有 3 根柱子及 N 个不同大小的穿孔圆盘，盘子可以滑入任意一根柱子。
 * 一开始，所有盘子自上而下按升序依次套在第一根柱子上(即每一个盘子只能放在更大的盘子上面)。
 * 移动圆盘时受到以下限制:
 * (1) 每次只能移动一个盘子;
 * (2) 盘子只能从柱子顶端滑出移到下一根柱子;
 * (3) 盘子只能叠在比它大的盘子上。
 * 
 * 请编写程序，用栈将所有盘子从第一根柱子移到最后一根柱子。
 * 
 * 你需要原地修改栈。
 * 
 * 示例1:
 *  输入：A = [2, 1, 0], B = [], C = []
 *  输出：C = [2, 1, 0]
 * 
 * 示例2:
 *  输入：A = [1, 0], B = [], C = []
 *  输出：C = [1, 0]
 *  
 * 提示:
 * A中盘子的数目不大于14个。
 * 
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode-cn.com/problems/hanota-lcci
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} A
 * @param {number[]} B
 * @param {number[]} C
 * @return {void} Do not return anything, modify C in-place instead.
 */
var hanota = function(A, B, C) {
  // 递归 分治
  // 分治：把n个的问题，转化成n-1个问题，最后转化为1的问题
  // A(n),B(),C() -> A(),B(n-1),C(1) -> A(), B(), C(n)
  function move(n,A,B,C) { // B代表空盘
    if(n === 1) C.push(A.pop())
    if(n > 1) {
      move(n-1,A,C,B) // 步骤1：把n-1个盘子从A移动到B
      C.push(A.pop()) // 步骤2：把A剩余的最大一个盘子移动到C
      // 此时，A 空，B n-1，C 有一个最大的盘子
      move(n-1,B,A,C) // 步骤3： 把n-1个盘子从B移动到C
    }
  }
  move(A.length,A,B,C)
};