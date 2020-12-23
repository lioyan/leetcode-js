/**
 * 5. 最长回文子串
 * medium
 * 
给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

示例 1：
输入: "babad"
输出: "bab"
注意: "aba" 也是一个有效答案。

示例 2：
输入: "cbbd"

输出: "bb"

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-palindromic-substring
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  // dp
  // dp[j][i]为回文的条件是s[j] === s[i] 并且dp[j+1][i-1]为回文
  // j,i 为字符串s的头尾两个索引。
  // 也就是说{j,i}为回文，那么{j+1,i-1}必须是回文并且s[j] = s[i]
  let res = ''
  let length = s.length
  let dp = Array.from(Array(length), () => Array(length).fill(false))
  for(let i = 0; i < length; i++) {
    for(let j = i; j >= 0; j--) {
      dp[j][i] = (s[i] === s[j]) && (i - j < 2 || dp[j+1][i-1])
      // console.log(dp)
      if(dp[j][i] && i - j + 1 > res.length) {
        console.log(j,i)
        res = s.slice(j, i + 1)
      }
    }
  }
  return res
};

let s = 'babad'
s = 'cbbd'
console.log(longestPalindrome(s))