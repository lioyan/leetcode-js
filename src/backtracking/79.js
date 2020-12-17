/**
 * 79. 单词搜索
 * medium
给定一个二维网格和一个单词，找出该单词是否存在于网格中。
单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。
同一个单元格内的字母不允许被重复使用。

示例:
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]
给定 word = "ABCCED", 返回 true
给定 word = "SEE", 返回 true
给定 word = "ABCB", 返回 false

提示：

board 和 word 中只包含大写和小写英文字母。
1 <= board.length <= 200
1 <= board[i].length <= 200
1 <= word.length <= 10^3

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/word-search
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  // 回溯
  // 回溯的步骤是上下左右各一步
  // 本题的第一步是先找到第一个字母，然后才递归
  word = word.split("");
  let l = board.length, h = board[0].length
  let res = false;
  let offset = [ // 回溯的步数
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];
  function backtracking(x, y, board, word) {
    console.log(board,word)
    if (res) return; // 本题是true或false，找到满足条件的一种解即可
    if (word.length === 0) { // 满足条件
      console.log(board, word);
      res = true;
      return;
    }
    for (let i = 0; i < offset.length; i++) { // 上下左右各尝试走一步
      let [m,n] = offset[i]
      let p = x + m, q = y + n
      if(p < 0 || q < 0 ||p >= l || q >= h) continue // 边界
      let curr = word.shift();
      if (board[p][q] === curr) {
        board[p][q] = "";
        backtracking(p, q, board, word);
        board[p][q] = curr;
      }
      word.unshift(curr);
    }
  }
  for (let i = 0; i < board.length; i++) { // 遍历二维数组
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === word[0]) { // 找到第一个字母的i，j
        board[i][j] = ''
        let tmp = word.shift()
        backtracking(i, j, board, word); // 递归
        word.unshift(tmp) // 此处也需回退
        board[i][j] = tmp // 此处也需回退
      }
    }
  }
  return res;
};
let board = [
  ["A", "B", "C", "E"],
  ["S", "F", "C", "S"],
  ["A", "D", "E", "E"],
];
let word = "ABCCED";
board = [
  ["b", "b", "a", "a", "b", "a"],
  ["b", "b", "a", "b", "a", "a"],
  ["b", "b", "b", "b", "b", "b"],
  ["a", "a", "a", "b", "a", "a"],
  ["a", "b", "a", "a", "b", "b"],
];
word = "abbbababaa";
board = [["b"], ["a"], ["b"], ["b"], ["a"]];
word = "baa";
console.log(exist(board, word));
