# [四数相加 II](https://leetcode.cn/problems/4sum-ii/description/ "https://leetcode.cn/problems/4sum-ii/description/")

给你四个整数数组 `nums1`、`nums2`、`nums3` 和 `nums4` ，数组长度都是 `n` ，请你计算有多少个元组 `(i, j, k, l)` 能满足：

- `0 <= i, j, k, l < n`
- `nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0`

**示例 1：**

```js
输入： nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
输出： 2
解释：
两个元组如下：
1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0
```

**示例 2：**

```js
输入： nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
输出： 1
```

## 思路

- 用map记录两数之和出现的次数
- 剩余两数之和，如果在map出现，则count 加上出现的次数

```js
var fourSumCount = function(nums1, nums2, nums3, nums4) {
    // 记录前两数之和出现的次数
    const towSumMap = new Map()
    //记录出现之和
    let count = 0;
    for(let n1 of nums1){
        for(let n2 of nums2){
            const sum = n1 + n2
            // 记录n1 + n2
            towSumMap.set(sum, (towSumMap.get(sum) || 0) +1)
        }
    }
    for(let n3 of nums3){
        for(let n4 of nums4){
            const sum = n3 + n4
            // 如果 存在 0 - n3 -n4 ，则为所需结果
            count += towSumMap.get(0-sum) || 0
        }
    }
    return count
};
```
