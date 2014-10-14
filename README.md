router.js
======

基于hash单页路由控制

###版本信息：
 * @fileOverview  基于hash的页内路由插件
 * @autor Yoocky <me@yoocky.com>
 * @ version 1.0
 
###库文件依赖
 
 *zepto.js 或者 jQuery

###兼容性
 
 *IE8+, webkit核

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
    var appRoute = new router();
```

#####2、自定义配置：
```javascript
    var appRoute = new router({
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
| 1111 | 2222 | 3333 |   24|1233|
 conroller type Object
        
        数据格式demo :
            
        {
         "index" : {}
        }
        
        为空对象或者未设置时会自动遍历初始化

 index type String 
 
       demo "index"
       为空时自动在页面上取第一个有效的cotroller
         
 wrap type String 
         
         默认为"singlePage" 
         路由有效范围的属性标志
         
 pageFlag type String
         
         默认为"page"
         存放controller的属性标志
         

####自定义 Events 的相关参数

###router方法API
