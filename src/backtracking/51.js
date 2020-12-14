/**
 * 51. N 皇后
 * hard
 * 
n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。

每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

示例：
输入：4
输出：[
 [".Q..",  // 解法 1
  "...Q",
  "Q...",
  "..Q."],

 ["..Q.",  // 解法 2
  "Q...",
  "...Q",
  ".Q.."]
]
解释: 4 皇后问题存在两个不同的解法。

提示：
皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/n-queens
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function (n) {
  // 回溯
  // 当前皇后位置为(i,i)，不能放置的条件是：斜线 - (i*x,i*x),横线 - (i,x),纵线 - (x,i)
  let res = [],
    blank = Array.from(Array(n), () => Array(n).fill(".")); // n*n放置'.'的棋盘
  function backtracking(count, xy, blank) {
    // xy 分别是已放置的所有皇后位置的坐标
    // count为当前皇后个数
    let isTrue = false;
    if (xy.length) {
      // 判断最后一个皇后位置和前面的皇后位置是否有矛盾
      var [i, j] = xy[xy.length - 1];
      for (let z = 0; z < xy.length - 1; z++) {
        let [x, y] = xy[z];
        if (x === i || y === j || Math.abs(j - y) === Math.abs(i - x)) {
          // 同行 || 同列 || 斜线（x差值和y差值的绝对值相等，表示斜线）
          isTrue = true;
          return;
        }
      }
    }
    if (isTrue) return; // 皇后位置矛盾，返回
    if (count === n && xy.length === n) { // 皇后满足条件
      let tmp = []
      for(let i = 0; i < blank.length; i++) { // 深拷贝当前的棋盘blank
        let arr = blank[i].join('')
        tmp.push(arr)
      }
      res.push(tmp);
      return;
    }
    let p = count; // 一行一行的放，只放下一行
    for (let q = 0; q < n; q++) { // 下一行的所有列
      blank[p][q] = "Q";
      xy.push([p, q]); // 尝试放入一个棋子
      backtracking(count + 1, xy, blank); // 判断是否满足和返回
      blank[p][q] = "."; // 拿出放入的棋子
      xy.pop();
    }
  }
  backtracking(0, [], blank);
  return res;
};

console.log(solveNQueens(4));
