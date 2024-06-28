# [反转字符串 II](https://leetcode.cn/problems/reverse-string-ii/description/ "https://leetcode.cn/problems/reverse-string-ii/description/")

给定一个字符串 `s` 和一个整数 `k`，从字符串开头算起，每计数至 `2k` 个字符，就反转这 `2k` 字符中的前 `k` 个字符。

- 如果剩余字符少于 `k` 个，则将剩余字符全部反转。
- 如果剩余字符小于 `2k` 但大于或等于 `k` 个，则反转前 `k` 个字符，其余字符保持原样。

**示例 1：**

```js
输入： s = "abcdefg", k = 2
输出： "bacdfeg"
```

**示例 2：**

```js
输入： s = "abcd", k = 2
输出： "bacd"
```

## 思路

- 将字符串转成数组操作（js不能直接更改字符串）
- for循环，每2k进行操作
- 边界处理，当不足k个字符时，全部反转

```js
var reverseStr = function(s, k) {
    // 将字符串转成数组，2k遍历数组
    const arr = s.split("")
    const len = arr.length
    for(let i =0;i<len;i+= 2*k){
        let left = i
        let right = i+k > len? len-1:i+k-1
        reverse(arr,left,right)
    }
    return arr.join('')
};
const reverse = (arr,left,right) =>{
    while(left<right){
        [arr[left],arr[right]] =[arr[right],arr[left]]
        left++
        right--
    }
}
```
