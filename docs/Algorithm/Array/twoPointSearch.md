# 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:

输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
示例 2:

输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1

## 思路

二分查找条件：1、有序数组 2、无重复元素

当满足这两个条件就可以考虑是不是二分法

## 细节

- while(left < right) 还是 while(left <= right)
- right = middle 还是right = middle -1
- return right 还是return right

采用哪种判断逻辑取决于区间的闭合到底是左闭右闭还是左闭右开

### 左闭右闭 [left, right]

- 当为左闭右闭时，target 在区间内，所以left === right是有意义的 所以使用<=
- if (nums[middle] > target) right 要赋值为 middle - 1，因为当前这个nums[middle]一定不是target，那么接下来要查找的左区间结束下标位置就是 middle - 1

```js
    var search = function(nums, target) {
    let left = 0;
    let right = nums.length - 1;
    while(left<=right){
        let mid = Math.floor((right-left)/2) + left
        if(nums[mid]>target){
            right = mid -1
        }else if (nums[mid] < target){
            left = mid + 1
        }else{
            return mid
        }
    }
    return -1
};
```

## 相关题目

- 35.搜索插入位置
- 34.在排序数组中查找元素的第一个和最后一个位置
- 69.x 的平方根
- 367.有效的完全平方数
