/**
 *版本信息
 * @fileOverview  基于hash的页内路由插件
 * @autor Yoocky <me@yoocky.com>
 * @ version 1.0
 *
 *功能描述
 * 1、支持历史记录，响应浏览器的前进后退
 * 2、支持<a href="#controller" ></a> 格式跳转
 * 3、支持open("controller")方法打开页面
 * 4、支持设置默认首页，
 * 5、支持带hash值的url直接打开对应页面
 * 6、支持页面切换绑定事件
 * 7、暂不支持页面切换自定义动画效果
 *
 *配置说明
 *@param conroller type Object
 *      数据格式demo :
 *          {
 *            "index" : {//待扩展如加入切换的动画效果},
 *          }
 *          为空对象或者未设置时会自动遍历初始化
 *@param index type String 
 *       demo "index"
 *       为空时自动在页面上取第一个有效的cotroller
 *@param wrap type String 
 *       默认为"singlePage" 
 *       路由有效范围的属性标志
 *@param pageFlag type String
 *       默认为"page"
 *       存放controller的属性标志
 */
; (function(w) {
    function Router(options) {
        options = options || {};
        var that = this;
        var defaults = {
            wrap: 'singlePage',
            pageFlag: 'page',
            index: '',
            controller: {}
        };
        $.extend(this, defaults, options);
        that._wrap = $('[' + this.wrap + ']');
        that._initController();
        that._initIndex();
        that._initPath();
        that._hashChange();
        that.open(that.path.curPage);
    }
    //原型上的一些方法
    Router.prototype = {
        //存放自定义事件堆栈
        _events : {},
        //当未配置路由时，自动补全路由列表
        _initController: function() {
            var that = this;
            if ($.isEmptyObject(that.controller)) {
                that._wrap.find('[' + this.pageFlag + ']').each(function() {
                    var page = $(this).attr('page');
                    if (page) {
                        that.controller[page] = {};
                    }
                });
            }
        },
        //当未设置默认首页时从controller中取第一个为默认首页
        _initIndex: function() {
            if (this.index === '') {
                for(var page in this.controller){
                    this.index = page;
                    break;
                }
            }   
        },
        _initPath: function() {
            var root = w.location.pathname;
            var curPage = w.location.hash.replace("#", '');
            //如何hash值无效，默认回到首页
            curPage = curPage in this.controller ? curPage: this.index;
            var path = {
                "root": root,
                "curPage": curPage
            };
            this.path = path;
        },
        _getUrl: function(to) {
            var url = this.path.root + '#' + (to || this.path.curPage);
            return url;
        },
        _pushHash: function(hash, title) {
            w.location.hash = hash;
            if (title) {
                document.title = title;
            }
        },
        _hashChange: function() {
            var that = this;
            w.addEventListener('hashchange',
            function() {
                var page = w.location.hash.replace('#', '');
                that.open(page);
            });
        },
        on:  function (eventName, callback) {
            if (typeof eventName === 'string') {
                this._events[eventName] = this._events[eventName] || [];
                if (callback) {
                    this._events[eventName].push(callback);
                }
            } else {
                for (var o in eventName) {
                    this.on(o, eventName[o]);
                }
            }
        },
        off: function(eventName, callback) {
            if (typeof eventName === 'string') {
                if (this._events[eventName]) {
                    for (var i = 0, len = this._events[eventName].length; i < len; i++) {
                        if (!callback || this._events[eventName][i] === callback) {
                            this._events[eventName].splice(i, 1);
                            return;
                        }
                    }
                }
            } else {
                for (var o in eventName) {
                    this.off(o, eventName[o]);
                }
            }
        },
        trigger: function(eventName, args) {
            if (this._events[eventName]) {
                for (var i = 0, len = this._events[eventName].length; i < len; i++) {
                    var eventCb = this._events[eventName][i];
                    if (eventCb && eventCb.apply(null, args || []) === false) {
                        return;
                    }
                }
            }
        },
        open: function(to, callback) {
            to = to || this.index;
            callback = $.isFunction(callback) ? callback: function() {};
            if (to in this.controller) {
                var current = this._wrap.find('[' + this.pageFlag + '=' + to + ']');
                if (current.length) {
                    var _to = this.controller[to];
                    var from = this.path.curPage;
                    this.trigger("beforeOpen", [to, from]);
                    if(from != to){
                        this.path.curPage = to;
                        var title = current.attr('title');
                        this._pushHash(to, title);
                    }
                    current.show().siblings().hide();
                    this.trigger("afterOpen", [to, from]);
                    callback();
                } else {
                    return "Error: not found the page dom";
                }
            } else {
                return "Error: not found the controller";
            }

        }
    };
    w.Router = Router;
})(window);
