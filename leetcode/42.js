// https://leetcode.cn/problems/trapping-rain-water/
// 接雨水
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const maxL = new Array(height.length).fill(0);
  const maxR = new Array(height.length).fill(0);

  maxL[0] = height[0];
  maxR[height.length - 1] = height[height.length - 1];

  for (let i = 1; i < height.length; i++) {
    maxL[i] = Math.max(maxL[i - 1], height[i]);
  }

  for (let i = height.length - 2; i >= 0; i--) {
    maxR[i] = Math.max(maxR[i + 1], height[i]);
  }

  let result = 0;
  for (let i = 0; i < height.length; i++) {
    result += Math.min(maxL[i], maxR[i]) - height[i];
  }

  return result;
};