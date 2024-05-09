# 并发控制

```js
    class LimitPromise {
        // 构造器 最大并发数量 当前执行数量 等待执行队列
        constructor(max){
            this.max = max || 6
            this._count = 0
            this._taskQueue = []
        }

        // 主函数 处理任务队列
        run(caller){
            return new Promise((resolve,reject)=>{
                let task = this._createTask(caller,resolve,reject)
                if(this._count >= this.max){
                    this._taskQueue.push(task)
                }else{
                    task()
                }
            })
            this.count++
        }

        // 执行器，当执行完了链式调用队列里下一个任务
        _createTask(caller,resolve,reject){
            return ()=>{
                caller().then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                }).finally(()=>{
                    this._count --
                    if(this._taskQueue.length){
                        let task = this._taskQueue.shift()
                        task()
                    }
                })
            }
        }

        // 单例模式
        this.intance = null
        getIntance(max){
            if(!this.intance){
                this.intance = new LimitPromise(max)
            }
            return this.intance
        }
    }
```
