# [27. 移除元素](https://leetcode.cn/problems/remove-element/)

给你一个数组 `nums` **和一个值 `val`，你需要 **[原地](https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)** 移除所有数值等于 `val`**的元素。元素的顺序可能发生改变。然后返回 `nums` 中与 `val` 不同的元素的数量。

假设 `nums` 中不等于 `val` 的元素数量为 `k`，要通过此题，您需要执行以下操作：

- 更改 `nums` 数组，使 `nums` 的前 `k` 个元素包含不等于 `val` 的元素。`nums` 的其余元素和 `nums` 的大小并不重要。
- 返回 `k`。
**示例 1：**

```js
输入： nums = [3,2,2,3], val = 3
输出： 2, nums = [2,2,_,_]
解释： 你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
```

**示例 2：**

```js
输入： nums = [0,1,2,2,3,0,4,2], val = 2
输出： 5, nums = [0,1,4,0,3,_,_,_]
解释： 你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,0,1,3,4。
注意这五个元素可以任意顺序返回。
你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。
```

## 思路 -快慢指针

- 快慢指针，慢指针指向待删除元素，快指针指向待删除元素后面的元素
- 当快指针指向的元素等于val时，快指针向前移动一步，慢指针指向快指针指向的元素
- 当快指针指向的元素不等于val时，将快指针指向的元素赋值给慢指针指向的元素，然后快慢指针同时向前移动一步
- 重复上述操作直到快指针指向数组末尾

```js
var removeElement = function(nums, val) {
    let fast = slow = 0
    while(fast < nums.length){
        if(nums[fast] !== val){
            nums[slow] = nums[fast]
            slow++
        }
        fast++
    }
    return slow
};
```

## 相关题目

- 26.删除排序数组中的重复项
- 283.移动零
- 977.有序数组的平方