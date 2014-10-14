router.js
======

基于hash单页路由控制

###版本信息
 * @fileOverview  基于hash的页内路由插件
 * @autor Yoocky <me@yoocky.com>
 * @ version 1.0

###功能描述
 * 1、支持历史记录，响应浏览器的前进后退
 * 2、支持<a href="#controller" ></a> 格式跳转
 * 3、支持open("controller")方法打开页面
 * 4、支持设置默认首页，
 * 5、支持带hash值的url直接打开对应页面
 * 6、支持页面切换绑定事件
 * 7、暂不支持页面切换自定义动画效果
 
###配置说明

 *@param conroller type Object
        
        数据格式demo :
            
        {
         "index" : {
                title : "页面的title",
                before: function(){},//打开前的回调
                after: function(){}//打开后的回调
            }
        }
        
        为空对象或者未设置时会自动遍历初始化

 *@param index type String 
 
       demo "index"
       为空时自动在页面上取第一个有效的cotroller
         
 *@param wrap type String 
         
         默认为"singlePage" 
         路由有效范围的属性标志
         
 *@param pageFlag type String
         
         默认为"page"
         存放controller的属性标志
         
 *@param beforeFn type Function
        
        全局的切换页面前的回调
         
 *@param refreshFn type Function
        
        通过路由刷新页面的回调
         
 *@param changeFn type Function
        
        全局切换页面后的回调
         
 *@param awaysFn type Function
         
         刷新切换后的总是回调

