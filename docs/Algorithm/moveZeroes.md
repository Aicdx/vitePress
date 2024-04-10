给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

来源：力扣（LeetCode）
链接：<https://leetcode-cn.com/problems/move-zeroes>

解题思路：在原数组上操作无非两种方法，一是用双指针法，另外就是用数组的splice和push方法

方法一：

双指针法：先循环一次，统计0的个数，第二次循环，把数组的前面为0的步分都取代掉，第三次循环，把0放在数组的最后面

```js
var moveZeroes = function(nums) {
    let count = 0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]==0){
            count++
        }
    }
    let j =0;
    for(let i=0;i<nums.length;i++){
        if(nums[i]!=0){
            nums[j]=nums[i];
            j++
        }
    }
    for(let i=1;i<=count;i++){
        nums[nums.length-i]=0
    }
}
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/19/16d4743bea52bacf~tplv-t2oaga2asx-image.image)

方法二：

数组api法：

用循环时涉及到数组的删除要巧妙点设计for循环结构，因为splice只会删除元素不会删除长度，整体会往前移动，所以这个时候i是不能自增的，所以i++是不能放在循环条件里面的，先let len=nums.length，然后再操作len，整体思路是遇到0时删除nums[i]，然后再push(0)，在数组后面，

```js
var moveZeroes = function(nums) {
    let len = nums.length;
    for(let i=0;i<len;){
        if(nums[i]==0){
            nums.splice(i,1);
            nums.push(0);
            len--
        }
        else{
            i++
        }
    }
}
```

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/9/19/16d474cc911957ed~tplv-t2oaga2asx-image.image)
