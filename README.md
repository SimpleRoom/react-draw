# 完善思路 

  我总感觉我哪里好像写错了

## 第一版完善目标  基于本地抽奖的完善


- 根据变动思路，优化state对象
- 合并优化fastRotateMove、slowRotateMove 两个函数体；
- 确定清除setInterval、setTimeout之类的定时器；
- 增加模拟接口，方便到时候直接对接现实场景；
- 修复一些小细节；  


#### 根据变动思路，优化state对象

delete  不在需要的

	// 转动开始位置默认：0，动态，可设置(>=0&&<stepCount)
	startIndex: 0,
	// 已经，快速，慢速 转的圈数，至少转的圈数
    ringNum: 0,
    fastRingNum: 5,
    slowRingNum: 1,
	// 是否要启动慢速
	isNeedSlow：false

edit   改动的
	
	// 转速   分别为最后0,1,2,3,4,5圈的转速
	speed: [250, 125, 66, 30, 30, 30],
	// 已经得到本次抽奖结果了
	getResultFinish: false,


#### 合并优化fastRotateMove、slowRotateMove 两个函数体；
	
	合并后的函数名为：startRun；
	
	具体看代码；

#### 确定清除setInterval、setTimeout之类的定时器；

	constructor(props){
		...
		this.timer = null;
	}

	componentWillUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
    }


#### 修复一些小细节
	
之前代码中，有类似这样的，建议一次setState

	this.setState({ endStopIndex: endIndex })
	// 正常抽奖，设置抽奖进行中状态
	this.setState({ isDrawing: true })
	
	个人直觉是觉得下面这种会更好，不一定对，说不定我是错的
	
	this.setState({endStopIndex, isDrawing});

早上讨论的随机值

	let endIndex = getRandomNum(1, 18)；
	
	改为了
	
	let endIndex = getRandomNum(1, 17)；