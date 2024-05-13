#

## 数组

### 数组拍平

```js
    let arr = [1,[2,[3,4,5]]]

    const flatten = function (arr){
        let result = []

        for(let i; i< arr.length;i++){
            if(Arrar.isArray(arr[i])){
                result = result.concat(
                    flatten(arr[i])
                )
            }else{
                result.push(arr[i])
            }
        }
        return result
    }
```
