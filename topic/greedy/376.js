/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {


  let count = 0

  let preDiff = 0
  let curDiff = 1

  for (let i = 0; i < nums.length - 1; i++) {
    curDiff = nums[i + 1] - nums[i]
    if (curDiff > 0 && preDiff < 0 || preDiff > 0 && curDiff < 0) {
      count++
      preDiff = curDiff
    } else if (preDiff === 0) {
      preDiff = curDiff
    }
  }
  if (count === 0) {
    return nums[0] === nums[nums.length - 1] ? 1 : 2
  }


  return count + 2
};

console.log(
  wiggleMaxLength([1, 2, 3, 4, 5, 6, 7, 8, 9])
)