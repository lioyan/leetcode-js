/**
 * 3. 无重复字符的最长子串
 * medium
 * 
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 
 * 示例 1:
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  示例 2:
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  示例 3:
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

  示例 4:
  输入: s = ""
  输出: 0

  提示：
  0 <= s.length <= 5 * 104
  s 由英文字母、数字、符号和空格组成

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/longest-substring-without-repeating-characters
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  // 滑动窗口
  if (s.length === 0) return 0
  let res = 0
  let i = 0, j = 0, l = s.length // i,j表示子串的起点和终点
  let map = {} // map记录和更新i,j
  for(;j<l;j++) {
    if(map[s[j]] !== undefined) { // map里面已经有了，说明有重复字符
      i = Math.max(i,map[s[j]]+1) // 判断重复字符和位置，取最大的一个，保证此时s[i:j]子串没有重复不会有重复
    }
    map[s[j]] = j // 当前遍历的索引为j
    res = Math.max(res, j-i+1) // 取最大记录
  }
  return res
};

var s = "abcabcbb"
s = "bbbbbb"
s="pwwkew"
s="au"
s="  "
s=""
s="abba"
console.log(lengthOfLongestSubstring(s))