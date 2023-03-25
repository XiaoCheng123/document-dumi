# setTimeout误差
## 前言
这是一个由于倒计时插件出现bug而出现的文章，导致我努力去寻找这个原因的源头，最后终于发现了新大陆（先事先展示一下新大陆的结论）:

1. setTimeout和setInterval都有误差
2. 以1秒为例，setInterval会每次准时在1秒钟的时候将微任务推入主任务队列，导致如果某次本该在时间（1s=1000ms）**1998ms**的时候改变数据，但是变成**2000ms**的时候改变数据。它（setInterval）在下一次循环的**2998ms**依然会改变数据，以此类推，导致此时会展示（这里考虑省略小数点，四舍五入同样原理）：==2000ms（2s）->2998ms（2s）->3998ms（3s）->4998ms（4s）->6000ms（6s）->6998ms（6s）==
3. 以1秒为例，setTimeout会每次都在1秒钟后将微任务推入主任务队列，导致如果某次本该在时间（1s=1000ms）**1998ms**的时候改变数据，以此类推，导致此时会展示（这里考虑省略小数点，四舍五入同样原理）：==1998ms（1s）->3000ms（3s）->4002ms（4s）->5004ms（5s）->6006ms（6s）->7006ms（7s）==


## 细究原理

首先，你得先了解[js的Event Loop机制](https://segmentfault.com/a/1190000014501666)里面的微任务和宏任务，不然，我们的沟通缺少了一个平台。

> 然后，就是问题的关键点了，为什么会出现这样的情况呢？

答案：以1秒为例，setInterval和setTimeout都会在异步模块运行，但是setInterval会每次都刚刚好1s钟的时候，将微任务队列的函数，交于任务队列进行执行。如果setInterval第一次1.004s的时候将任务推进队列，那么这时候setInterval的每次的误差会是在0.996s-1.01s内波动，而setTimeout每次的误差值都会大于1s。这里我画个图，相信大家就能够明白setInterval实现倒计时的不好之处（图中进制以省略小数点为准，四舍五入同理）

![image](https://github.com/XiaoCheng123/markdownImg/blob/master/segment%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E5%9B%BE%E7%89%87/24.png?raw=true)

## 附上一个react hooks版本的倒计时组件给大家

```
// 倒计时组件
import React, { useState, useEffect } from 'react';

interface CountdownInfo {
  hour: number;
  minute: number;
  second: number;
  day: number;
}

interface CountdownProps {
  sec: number;
  render: (data: CountdownInfo) => React.ReactNode;
  onEnd: () => void;
}

const Countdown: React.FC<CountdownProps> = ({ sec, render, onEnd }) => {
  const [endTime, setEndTime] = useState(new Date(Date.now() + sec*1000));
  const [countdownInfo, setCountdownInfo] = useState({
    hour: 0,
    minute: 0,
    second: 0,
    day: 0,
  } as CountdownInfo);

  const tick = () => {
    const seconds = Math.floor((endTime.getTime() - Date.now())/1000);
    const day = Math.floor(seconds / 86400);
    const hour = Math.floor((seconds % 86400) / 3600);
    const minute = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    setCountdownInfo({
      day,
      hour,
      minute,
      second: sec,
    } as CountdownInfo);

    if(seconds <= 0) {
      onEnd && onEnd();
    } else {
      window.setTimeout(tick, 1000);    // 时间不截至一直倒计时
    }
  }

  useEffect(() => {
    setEndTime(new Date(Date.now() + sec*1000));
  }, [sec]);
  useEffect(() => {
    tick(); // 初始化倒计时
  }, []);
  return render(countdownInfo) || null;
}

export default Countdown;
```
引用方式
```
const renderCountdown = ({day, hour, minute, second}): React.ReactNode => {
    return (
      <div>
        <span>{ day > 0 ? (day+'天') : null }</span>
        <span>hour</span>:
        <span>minute</span>:
        <span>second</span>
      </div>
    );
}

const onEnd = () => {
    console.log("倒计时结束")
}

<Countdown 
    sec={100} 
    render={renderCountdown} 
    onEnd={onEnd}
/>
```