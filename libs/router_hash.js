/**
 * @fileOverview  页内路由插件
 * @autor Yoocky
 * @demo
 * var page = new router({controller:{"index" : {before: function(){}, after:function(){},title:""}}})
 */
;(function(w){
  //tap事件检测
  var tap = 'ontouchend' in document ? 'tap' : 'click';
  function router(options){
	options = options || {}
	var that = this;
	var defaults = {
		wrap : 'singlePage',
		pageFlag : 'page',
		before : function(){},
		refreshFn:  function(){},
		changeFn :  function(){},
		awaysFn :  function(){},
		controller : {}
	}
	$.extend(this, defaults, options);
	that._wrap = $('[' + this.wrap + ']');
	that._initController();
	that.page = this._getPath();
	that._bindHref();
	that._popState();
	that.title = document.title;
	that.open();
	
 }
 //原型上的一些方法
 router.prototype = {
 	_initController : function(){
 		var that = this;
 		if($.isEmptyObject(that.cotroller)){
			that._wrap.find('[' + this.pageFlag + ']').each(function(){
				var page = $(this).attr('page');
				if(page){
					that.controller[page] = {};
				}
			})
		}
 	},
 	_getPath : function(){
 		var path = window.location.pathname;
 		var root = path.replace(/\/$/, "").split('/');
 		var cur = root.pop();
 		var page = {
 			"root" : root.join('/') + '/',
 			"current" : cur
 		}
 		return page;
 	},
 	_url : function(to){
 		var url = this.page.root + this.page.current;
 		return url;
 	},
 	_pushState : function (data, title, url) {
 	   data = data || {};
 	   title = title || this.title;
	   history.pushState(data, title, url);
	},
	_replaceState : function(data, title, url){
	   data = data || {};
 	   title = title || this.title;
	   history.replaceState(data, title, url);
	},
	_bindHref : function(){
		var that = this;
		that._wrap.on(tap, 'a', function(){
			var page = $(this).attr('href');
			if(page && that.controller.hasOwnProperty(page)){
				that.open(page);
				return false;
			}
		})
	},
	_popState : function(){
		var that = this;
		window.addEventListener('popstate', function(e) {
		    if(e.state){
		    	that.open(e.state);
		    }
		});
	},
	open : function(to, callback){
 		to = to || this.page.current;
 		callback = $.isFunction(callback) ? callback : $.noop;
 		if(to in this.controller){
 			var current = this._wrap.find('[' + this.pageFlag + '=' + to + ']');
 			if(current.length){
 				var _to = this.controller[to];
 				var from = this.page.current;
 				this.before()
 				//执行页面打开前私有回调
 				if($.isFunction(_to.before)){
 					_to.before(_from);
 				}
	 			if(from === to){
	 				this.refreshFn();
	 				this._replaceState(to, _to.title, this._url(to));
	 			}else{
	 				this.changeFn();
	 				this.page.current = to;
	 			    this._pushState(to, _to.title, this._url(to));
	 			}
	 			current.show().siblings().hide();
	 			this.awaysFn();
	 			//执行页面打开后私有回调
	 			if($.isFunction(_to.after)){
	 				_to.after(_from);
	 			}
	 			callback();
 			}else{
 				return "Error: not fount the page dom";
 			}
 		}else{
 			return "Error: not fount the controller";
 		}
		
 	}
 }
 w.router = router;
})(window)
