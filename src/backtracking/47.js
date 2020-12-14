/**
 * 47. 全排列 II
 * medium
给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

示例 1：
输入：nums = [1,1,2]
输出：
[[1,1,2],
 [1,2,1],
 [2,1,1]]

示例 2：
输入：nums = [1,2,3]
输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

提示：
1 <= nums.length <= 8
-10 <= nums[i] <= 10

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/permutations-ii
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

 /**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  // 回溯
  // 这一题有重复数字，所以不能暴力的去重
  // 需要把每次递归的元素从nums中拿出来，用剩余元素递归,然后剪枝
  let res = []
  function backtracking(nums, arr) {
    let visited = [] // 记录本次递归的遍历过程中的元素
    if(!nums.length){
      res.push([...arr])
      return
    }
    for(let i = 0; i < nums.length; i++) {// 此时的nums为newNums，全遍历
      if(visited.indexOf(nums[i]) > -1) continue // 剪枝 如果这次递归的元素和上次的一样，跳过
      arr.push(nums[i])
      let newNums = [...nums]
      newNums.splice(i,1) // 取出当前元素
      backtracking(newNums, arr)
      visited.push(arr.pop()) // 记录上一次遍历的元素
    }
  }
  backtracking(nums, [])
  return res
};
let nums = [3,3,0,3]
console.log(permuteUnique(nums))