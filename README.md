router.js
======

基于hash单页路由控制

###版本信息：
 * @fileOverview  基于hash的页内路由插件
 * @autor Yoocky <me@yoocky.com>
 * @version 1.0
 
###库文件依赖：
 
 *zepto.js 或者 jQuery

###兼容性:
 
|Chrome	|Firefox |(Gecko)	|IE|	Opera|	Safari|	IPHONE|	Android|
| ----   | ----     | ----     | ---- |----    |----     | ---- |----    |
|5+	|3.6+| (1.9.2)+|	8.0+(标准模式)|	11.60+	|5.0+|	5.0+|	2.2+|

###功能描述：
 * 1、支持历史记录，响应浏览器的前进后退
 * 2、支锚标记 href="#controller" 格式跳转
 * 3、支持open("controller")方法打开页面
 * 4、支持设置默认首页，
 * 5、支持带hash值的url直接打开对应页面
 * 6、支持页面切换绑定事件
 * 7、暂不支持页面切换自定义动画效果
 
###实例化router：
####html结构
 ```html
    <content singlePage>
		<div page="index" title="首页">
		  <h2>这是首页</h2>
		  <p>这是一个简单的单页路由，吸取了angular和backbone的特点</p>
		</div>
		<div page="page1" title="页面1">
		  <h2>这是第一个子页面</h2>
		  <p>很简单的配置</p>
		</div>
		<div page="page2" title="页面2">
		  <h2>这是第二个子页面</h2>
		  <p>更改hash是可以产生历史记录的</p>
		</div>
	</content>
```

####JavaScript
#####1、自动化配置：
```javascript
    var appRoute = new Router();
```

#####2、自定义配置：
```javascript
    var appRoute = new Router({
    	controller: {
            "index": {},
            "page1": {},
            "page2": {}
	},
    	index : "index",
	    	
   });
```

###router参数说明：
####基本配置参数



| 参数名 | 数据类型 | 数据结构 |默认值|功能描述|
| ----   | ----     | ----     | ---- |----    |
| controller  | Object    | {"pagename": {}}    |   自动生成|路由控制器|
| index | String | |   自动在页面上取第一个有效的cotroller|设置默认的首页|
| wrap | String |   |   "singlePage"|路由作用范围的属性标识|
| pageFlag | String |  |   "page"|路由内部的分页标识|
| path.root | String |  | 自动生成 | 当前页面的根路径<br/>等价于 location.origin + location.pathname| 
| path.curPage | String |  | 动态维护 | 当前页面的索引值| 

####自定义 Events 的相关参数
| 事件名 | 传递参数 | 触发时机|
| ----   | ----   |---- |
| beforeOpen  |  arguments[0] String 预打开页的索引 <br/> arguments[1] String 当前页的索引  | 预切换页面前 |
| afterOpen   |  arguments[0] String 已打开页的索引 <br/> arguments[1] String 前一个页面的索引| 切换页面成功后 |

###router方法API：

| 方法名 | 参数 | 功能描述|
| ----   | ----   |---- |
| open  |  arguments[0] String  预打开页面的索引<br/> arguments[1] Function 打开页面成功后的回调 | 打开一个新页面，并改变hash值 |
| on   |  arguments[0] String 事件名 <br/> arguments[1] Function 回调函数| 添加事件绑定 |
| off  |  arguments[0] String 事件名 <br/> arguments[1] Function 回调函数| 解除事件绑定 |
| trigger  |  arguments[0] String 事件名 <br/> arguments[1] Function 回调函数| 触发事件 |
