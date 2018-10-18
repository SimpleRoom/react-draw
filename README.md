#### React 方形转盘抽奖

+ <code>npm install</code>
+ <code>npm run start</code>
+ <code>npm run build</code>
+ [DEMO](https://wjf444128852.github.io/demo/react/draw)

#### 思路

+ 1、根据接口判断用户是否有权限参与，是否有抽奖次数
+ 2、有权限则开启动画，开启的同时限制用户在动画未结束再次抽奖，根据返回礼物ID得出最后要停下的位置
+ 3、动画：每次移动一步，同时重置选中状态，到达终点起点重置为初始位置，同时圈数减一，开始下一圈，同时定时器时间增加，转速语速变慢