/**
 * @fileOverview  基于hash的页内路由插件
 * @autor Yoocky
 */
; (function(w) {
    function router(options) {
        options = options || {};
        var that = this;
        var defaults = {
            wrap: 'singlePage',
            pageFlag: 'page',
            before: function() {},
            refreshFn: function() {},
            changeFn: function() {},
            awaysFn: function() {},
            index: '',
            controller: {}
        };
        $.extend(this, defaults, options);
        that._wrap = $('[' + this.wrap + ']');
        that._initController();
        that.path = that._initPath();
        that._hashChange();
        that.open();

    }
    //原型上的一些方法
    router.prototype = {
        _initController: function() {
            var that = this;
            if ($.isEmptyObject(that.controller)) {
                that._wrap.find('[' + this.pageFlag + ']').each(function() {
                    var page = $(this).attr('page');
                    if (page) {
                        //当未设置默认首页时取Dom中从上往下第一个有效的cotroller为默认首页
                        if (that.index === '') {
                            that.index = page;
                        }
                        that.controller[page] = {};
                    }
                });
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
            return path;
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
        open: function(to, callback) {
            to = to || this.path.curPage;
            callback = $.isFunction(callback) ? callback: function() {};
            if (to in this.controller) {
                var current = this._wrap.find('[' + this.pageFlag + '=' + to + ']');
                if (current.length) {
                    var _to = this.controller[to];
                    var from = this.path.curPage;
                    this.before();
                    //执行页面打开前私有回调
                    if ($.isFunction(_to.before)) {
                        _to.before(from);
                    }
                    if (from == to) {
                        this.refreshFn();
                    } else {
                        this.changeFn();
                        this.path.curPage = to;
                        this._pushHash(to, _to.title);
                    }
                    current.show().siblings().hide();
                    this.awaysFn();
                    //执行页面打开后私有回调
                    if ($.isFunction(_to.after)) {
                        _to.after(from);
                    }
                    callback();
                } else {
                    return "Error: not found the page dom";
                }
            } else {
                return "Error: not found the controller";
            }

        }
    };
    w.router = router;
})(window);
